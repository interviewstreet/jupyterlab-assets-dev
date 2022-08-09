(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_fileeditor-extension_lib_index_js"],{

/***/ "../../packages/fileeditor-extension/lib/commands.js":
/*!***********************************************************!*\
  !*** ../../packages/fileeditor-extension/lib/commands.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandIDs": () => (/* binding */ CommandIDs),
/* harmony export */   "FACTORY": () => (/* binding */ FACTORY),
/* harmony export */   "Commands": () => (/* binding */ Commands)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




const autoClosingBracketsNotebook = 'notebook:toggle-autoclosing-brackets';
const autoClosingBracketsConsole = 'console:toggle-autoclosing-brackets';
/**
 * The command IDs used by the fileeditor plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.createNew = 'fileeditor:create-new';
    CommandIDs.createNewMarkdown = 'fileeditor:create-new-markdown-file';
    CommandIDs.changeFontSize = 'fileeditor:change-font-size';
    CommandIDs.lineNumbers = 'fileeditor:toggle-line-numbers';
    CommandIDs.lineWrap = 'fileeditor:toggle-line-wrap';
    CommandIDs.changeTabs = 'fileeditor:change-tabs';
    CommandIDs.matchBrackets = 'fileeditor:toggle-match-brackets';
    CommandIDs.autoClosingBrackets = 'fileeditor:toggle-autoclosing-brackets';
    CommandIDs.autoClosingBracketsUniversal = 'fileeditor:toggle-autoclosing-brackets-universal';
    CommandIDs.createConsole = 'fileeditor:create-console';
    CommandIDs.replaceSelection = 'fileeditor:replace-selection';
    CommandIDs.runCode = 'fileeditor:run-code';
    CommandIDs.runAllCode = 'fileeditor:run-all';
    CommandIDs.markdownPreview = 'fileeditor:markdown-preview';
    CommandIDs.undo = 'fileeditor:undo';
    CommandIDs.redo = 'fileeditor:redo';
    CommandIDs.cut = 'fileeditor:cut';
    CommandIDs.copy = 'fileeditor:copy';
    CommandIDs.paste = 'fileeditor:paste';
    CommandIDs.selectAll = 'fileeditor:select-all';
})(CommandIDs || (CommandIDs = {}));
/**
 * The name of the factory that creates editor widgets.
 */
const FACTORY = 'Editor';
const userSettings = [
    'autoClosingBrackets',
    'codeFolding',
    'cursorBlinkRate',
    'fontFamily',
    'fontSize',
    'insertSpaces',
    'lineHeight',
    'lineNumbers',
    'lineWrap',
    'matchBrackets',
    'readOnly',
    'rulers',
    'showTrailingSpace',
    'tabSize',
    'wordWrapColumn'
];
function filterUserSettings(config) {
    const filteredConfig = Object.assign({}, config);
    // Delete parts of the config that are not user settings (like handlePaste).
    for (let k of Object.keys(config)) {
        if (!userSettings.includes(k)) {
            delete config[k];
        }
    }
    return filteredConfig;
}
let config = filterUserSettings(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig);
/**
 * A utility class for adding commands and menu items,
 * for use by the File Editor extension or other Editor extensions.
 */
var Commands;
(function (Commands) {
    /**
     * Accessor function that returns the createConsole function for use by Create Console commands
     */
    function getCreateConsoleFunction(commands) {
        return async function createConsole(widget, args) {
            var _a;
            const options = args || {};
            const console = await commands.execute('console:create', {
                activate: options['activate'],
                name: (_a = widget.context.contentsModel) === null || _a === void 0 ? void 0 : _a.name,
                path: widget.context.path,
                preferredLanguage: widget.context.model.defaultKernelLanguage,
                ref: widget.id,
                insertMode: 'split-bottom'
            });
            widget.context.pathChanged.connect((sender, value) => {
                var _a;
                console.session.setPath(value);
                console.session.setName((_a = widget.context.contentsModel) === null || _a === void 0 ? void 0 : _a.name);
            });
        };
    }
    /**
     * Update the setting values.
     */
    function updateSettings(settings, commands) {
        config = filterUserSettings(Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig), settings.get('editorConfig').composite));
        // Trigger a refresh of the rendered commands
        commands.notifyCommandChanged();
    }
    Commands.updateSettings = updateSettings;
    /**
     * Update the settings of the current tracker instances.
     */
    function updateTracker(tracker) {
        tracker.forEach(widget => {
            updateWidget(widget.content);
        });
    }
    Commands.updateTracker = updateTracker;
    /**
     * Update the settings of a widget.
     * Skip global settings for transient editor specific configs.
     */
    function updateWidget(widget) {
        const editor = widget.editor;
        editor.setOptions(Object.assign({}, config));
    }
    Commands.updateWidget = updateWidget;
    /**
     * Wrapper function for adding the default File Editor commands
     */
    function addCommands(commands, settingRegistry, trans, id, isEnabled, tracker, browserFactory) {
        // Add a command to change font size.
        addChangeFontSizeCommand(commands, settingRegistry, trans, id);
        addLineNumbersCommand(commands, settingRegistry, trans, id, isEnabled);
        addWordWrapCommand(commands, settingRegistry, trans, id, isEnabled);
        addChangeTabsCommand(commands, settingRegistry, trans, id);
        addMatchBracketsCommand(commands, settingRegistry, trans, id, isEnabled);
        addAutoClosingBracketsCommand(commands, settingRegistry, trans, id);
        addReplaceSelectionCommand(commands, tracker, trans, isEnabled);
        addCreateConsoleCommand(commands, tracker, trans, isEnabled);
        addRunCodeCommand(commands, tracker, trans, isEnabled);
        addRunAllCodeCommand(commands, tracker, trans, isEnabled);
        addMarkdownPreviewCommand(commands, tracker, trans);
        // Add a command for creating a new text file.
        addCreateNewCommand(commands, browserFactory, trans);
        // Add a command for creating a new Markdown file.
        addCreateNewMarkdownCommand(commands, browserFactory, trans);
        addUndoCommand(commands, tracker, trans, isEnabled);
        addRedoCommand(commands, tracker, trans, isEnabled);
        addCutCommand(commands, tracker, trans, isEnabled);
        addCopyCommand(commands, tracker, trans, isEnabled);
        addPasteCommand(commands, tracker, trans, isEnabled);
        addSelectAllCommand(commands, tracker, trans, isEnabled);
    }
    Commands.addCommands = addCommands;
    /**
     * Add a command to change font size for File Editor
     */
    function addChangeFontSizeCommand(commands, settingRegistry, trans, id) {
        commands.addCommand(CommandIDs.changeFontSize, {
            execute: args => {
                const delta = Number(args['delta']);
                if (Number.isNaN(delta)) {
                    console.error(`${CommandIDs.changeFontSize}: delta arg must be a number`);
                    return;
                }
                const style = window.getComputedStyle(document.documentElement);
                const cssSize = parseInt(style.getPropertyValue('--jp-code-font-size'), 10);
                const currentSize = config.fontSize || cssSize;
                config.fontSize = currentSize + delta;
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            label: args => {
                var _a;
                if (((_a = args.delta) !== null && _a !== void 0 ? _a : 0) > 0) {
                    return args.isMenu
                        ? trans.__('Increase Text Editor Font Size')
                        : trans.__('Increase Font Size');
                }
                else {
                    return args.isMenu
                        ? trans.__('Decrease Text Editor Font Size')
                        : trans.__('Decrease Font Size');
                }
            }
        });
    }
    Commands.addChangeFontSizeCommand = addChangeFontSizeCommand;
    /**
     * Add the Line Numbers command
     */
    function addLineNumbersCommand(commands, settingRegistry, trans, id, isEnabled) {
        commands.addCommand(CommandIDs.lineNumbers, {
            execute: () => {
                config.lineNumbers = !config.lineNumbers;
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            isEnabled,
            isToggled: () => config.lineNumbers,
            label: trans.__('Line Numbers')
        });
    }
    Commands.addLineNumbersCommand = addLineNumbersCommand;
    /**
     * Add the Word Wrap command
     */
    function addWordWrapCommand(commands, settingRegistry, trans, id, isEnabled) {
        commands.addCommand(CommandIDs.lineWrap, {
            execute: args => {
                config.lineWrap = args['mode'] || 'off';
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            isEnabled,
            isToggled: args => {
                const lineWrap = args['mode'] || 'off';
                return config.lineWrap === lineWrap;
            },
            label: trans.__('Word Wrap')
        });
    }
    Commands.addWordWrapCommand = addWordWrapCommand;
    /**
     * Add command for changing tabs size or type in File Editor
     */
    function addChangeTabsCommand(commands, settingRegistry, trans, id) {
        commands.addCommand(CommandIDs.changeTabs, {
            label: args => {
                var _a;
                if (args.insertSpaces) {
                    return trans._n('Spaces: %1', 'Spaces: %1', (_a = args.size) !== null && _a !== void 0 ? _a : 0);
                }
                else {
                    return trans.__('Indent with Tab');
                }
            },
            execute: args => {
                config.tabSize = args['size'] || 4;
                config.insertSpaces = !!args['insertSpaces'];
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            isToggled: args => {
                const insertSpaces = !!args['insertSpaces'];
                const size = args['size'] || 4;
                return config.insertSpaces === insertSpaces && config.tabSize === size;
            }
        });
    }
    Commands.addChangeTabsCommand = addChangeTabsCommand;
    /**
     * Add the Match Brackets command
     */
    function addMatchBracketsCommand(commands, settingRegistry, trans, id, isEnabled) {
        commands.addCommand(CommandIDs.matchBrackets, {
            execute: () => {
                config.matchBrackets = !config.matchBrackets;
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            label: trans.__('Match Brackets'),
            isEnabled,
            isToggled: () => config.matchBrackets
        });
    }
    Commands.addMatchBracketsCommand = addMatchBracketsCommand;
    /**
     * Add the Auto Close Brackets for Text Editor command
     */
    function addAutoClosingBracketsCommand(commands, settingRegistry, trans, id) {
        commands.addCommand(CommandIDs.autoClosingBrackets, {
            execute: args => {
                var _a;
                config.autoClosingBrackets = !!((_a = args['force']) !== null && _a !== void 0 ? _a : !config.autoClosingBrackets);
                return settingRegistry
                    .set(id, 'editorConfig', config)
                    .catch((reason) => {
                    console.error(`Failed to set ${id}: ${reason.message}`);
                });
            },
            label: trans.__('Auto Close Brackets for Text Editor'),
            isToggled: () => config.autoClosingBrackets
        });
        commands.addCommand(CommandIDs.autoClosingBracketsUniversal, {
            execute: () => {
                const anyToggled = commands.isToggled(CommandIDs.autoClosingBrackets) ||
                    commands.isToggled(autoClosingBracketsNotebook) ||
                    commands.isToggled(autoClosingBracketsConsole);
                // if any auto closing brackets options is toggled, toggle both off
                if (anyToggled) {
                    void commands.execute(CommandIDs.autoClosingBrackets, {
                        force: false
                    });
                    void commands.execute(autoClosingBracketsNotebook, { force: false });
                    void commands.execute(autoClosingBracketsConsole, { force: false });
                }
                else {
                    // both are off, turn them on
                    void commands.execute(CommandIDs.autoClosingBrackets, {
                        force: true
                    });
                    void commands.execute(autoClosingBracketsNotebook, { force: true });
                    void commands.execute(autoClosingBracketsConsole, { force: true });
                }
            },
            label: trans.__('Auto Close Brackets'),
            isToggled: () => commands.isToggled(CommandIDs.autoClosingBrackets) ||
                commands.isToggled(autoClosingBracketsNotebook) ||
                commands.isToggled(autoClosingBracketsConsole)
        });
    }
    Commands.addAutoClosingBracketsCommand = addAutoClosingBracketsCommand;
    /**
     * Add the replace selection for text editor command
     */
    function addReplaceSelectionCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.replaceSelection, {
            execute: args => {
                var _a, _b;
                const text = args['text'] || '';
                const widget = tracker.currentWidget;
                if (!widget) {
                    return;
                }
                (_b = (_a = widget.content.editor).replaceSelection) === null || _b === void 0 ? void 0 : _b.call(_a, text);
            },
            isEnabled,
            label: trans.__('Replace Selection in Editor')
        });
    }
    Commands.addReplaceSelectionCommand = addReplaceSelectionCommand;
    /**
     * Add the Create Console for Editor command
     */
    function addCreateConsoleCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.createConsole, {
            execute: args => {
                const widget = tracker.currentWidget;
                if (!widget) {
                    return;
                }
                return getCreateConsoleFunction(commands)(widget, args);
            },
            isEnabled,
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.consoleIcon,
            label: trans.__('Create Console for Editor')
        });
    }
    Commands.addCreateConsoleCommand = addCreateConsoleCommand;
    /**
     * Add the Run Code command
     */
    function addRunCodeCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.runCode, {
            execute: () => {
                var _a;
                // Run the appropriate code, taking into account a ```fenced``` code block.
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                let code = '';
                const editor = widget.editor;
                const path = widget.context.path;
                const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(path);
                const selection = editor.getSelection();
                const { start, end } = selection;
                let selected = start.column !== end.column || start.line !== end.line;
                if (selected) {
                    // Get the selected code from the editor.
                    const start = editor.getOffsetAt(selection.start);
                    const end = editor.getOffsetAt(selection.end);
                    code = editor.model.value.text.substring(start, end);
                }
                else if (_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.MarkdownCodeBlocks.isMarkdown(extension)) {
                    const { text } = editor.model.value;
                    const blocks = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.MarkdownCodeBlocks.findMarkdownCodeBlocks(text);
                    for (const block of blocks) {
                        if (block.startLine <= start.line && start.line <= block.endLine) {
                            code = block.code;
                            selected = true;
                            break;
                        }
                    }
                }
                if (!selected) {
                    // no selection, submit whole line and advance
                    code = editor.getLine(selection.start.line);
                    const cursor = editor.getCursorPosition();
                    if (cursor.line + 1 === editor.lineCount) {
                        const text = editor.model.value.text;
                        editor.model.value.text = text + '\n';
                    }
                    editor.setCursorPosition({
                        line: cursor.line + 1,
                        column: cursor.column
                    });
                }
                const activate = false;
                if (code) {
                    return commands.execute('console:inject', { activate, code, path });
                }
                else {
                    return Promise.resolve(void 0);
                }
            },
            isEnabled,
            label: trans.__('Run Code')
        });
    }
    Commands.addRunCodeCommand = addRunCodeCommand;
    /**
     * Add the Run All Code command
     */
    function addRunAllCodeCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.runAllCode, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                let code = '';
                const editor = widget.editor;
                const text = editor.model.value.text;
                const path = widget.context.path;
                const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(path);
                if (_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.MarkdownCodeBlocks.isMarkdown(extension)) {
                    // For Markdown files, run only code blocks.
                    const blocks = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.MarkdownCodeBlocks.findMarkdownCodeBlocks(text);
                    for (const block of blocks) {
                        code += block.code;
                    }
                }
                else {
                    code = text;
                }
                const activate = false;
                if (code) {
                    return commands.execute('console:inject', { activate, code, path });
                }
                else {
                    return Promise.resolve(void 0);
                }
            },
            isEnabled,
            label: trans.__('Run All Code')
        });
    }
    Commands.addRunAllCodeCommand = addRunAllCodeCommand;
    /**
     * Add markdown preview command
     */
    function addMarkdownPreviewCommand(commands, tracker, trans) {
        commands.addCommand(CommandIDs.markdownPreview, {
            execute: () => {
                const widget = tracker.currentWidget;
                if (!widget) {
                    return;
                }
                const path = widget.context.path;
                return commands.execute('markdownviewer:open', {
                    path,
                    options: {
                        mode: 'split-right'
                    }
                });
            },
            isVisible: () => {
                const widget = tracker.currentWidget;
                return ((widget && _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(widget.context.path) === '.md') || false);
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.markdownIcon,
            label: trans.__('Show Markdown Preview')
        });
    }
    Commands.addMarkdownPreviewCommand = addMarkdownPreviewCommand;
    /**
     * Add undo command
     */
    function addUndoCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.undo, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                widget.editor.undo();
            },
            isEnabled: () => {
                var _a;
                if (!isEnabled()) {
                    return false;
                }
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return false;
                }
                // Ideally enable it when there are undo events stored
                // Reference issue #8590: Code mirror editor could expose the history of undo/redo events
                return true;
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.undoIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Undo')
        });
    }
    Commands.addUndoCommand = addUndoCommand;
    /**
     * Add redo command
     */
    function addRedoCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.redo, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                widget.editor.redo();
            },
            isEnabled: () => {
                var _a;
                if (!isEnabled()) {
                    return false;
                }
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return false;
                }
                // Ideally enable it when there are redo events stored
                // Reference issue #8590: Code mirror editor could expose the history of undo/redo events
                return true;
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.redoIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Redo')
        });
    }
    Commands.addRedoCommand = addRedoCommand;
    /**
     * Add cut command
     */
    function addCutCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.cut, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                const editor = widget.editor;
                const text = getTextSelection(editor);
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Clipboard.copyToSystem(text);
                editor.replaceSelection && editor.replaceSelection('');
            },
            isEnabled: () => {
                var _a;
                if (!isEnabled()) {
                    return false;
                }
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return false;
                }
                // Enable command if there is a text selection in the editor
                return isSelected(widget.editor);
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.cutIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Cut')
        });
    }
    Commands.addCutCommand = addCutCommand;
    /**
     * Add copy command
     */
    function addCopyCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.copy, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                const editor = widget.editor;
                const text = getTextSelection(editor);
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Clipboard.copyToSystem(text);
            },
            isEnabled: () => {
                var _a;
                if (!isEnabled()) {
                    return false;
                }
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return false;
                }
                // Enable command if there is a text selection in the editor
                return isSelected(widget.editor);
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.copyIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Copy')
        });
    }
    Commands.addCopyCommand = addCopyCommand;
    /**
     * Add paste command
     */
    function addPasteCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.paste, {
            execute: async () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                const editor = widget.editor;
                // Get data from clipboard
                const clipboard = window.navigator.clipboard;
                const clipboardData = await clipboard.readText();
                if (clipboardData) {
                    // Paste data to the editor
                    editor.replaceSelection && editor.replaceSelection(clipboardData);
                }
            },
            isEnabled: () => { var _a; return Boolean(isEnabled() && ((_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content)); },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.pasteIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Paste')
        });
    }
    Commands.addPasteCommand = addPasteCommand;
    /**
     * Add select all command
     */
    function addSelectAllCommand(commands, tracker, trans, isEnabled) {
        commands.addCommand(CommandIDs.selectAll, {
            execute: () => {
                var _a;
                const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
                if (!widget) {
                    return;
                }
                const editor = widget.editor;
                editor.execCommand('selectAll');
            },
            isEnabled: () => { var _a; return Boolean(isEnabled() && ((_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content)); },
            label: trans.__('Select All')
        });
    }
    Commands.addSelectAllCommand = addSelectAllCommand;
    /**
     * Helper function to check if there is a text selection in the editor
     */
    function isSelected(editor) {
        const selectionObj = editor.getSelection();
        const { start, end } = selectionObj;
        const selected = start.column !== end.column || start.line !== end.line;
        return selected;
    }
    /**
     * Helper function to get text selection from the editor
     */
    function getTextSelection(editor) {
        const selectionObj = editor.getSelection();
        const start = editor.getOffsetAt(selectionObj.start);
        const end = editor.getOffsetAt(selectionObj.end);
        const text = editor.model.value.text.substring(start, end);
        return text;
    }
    /**
     * Function to create a new untitled text file, given the current working directory.
     */
    function createNew(commands, cwd, ext = 'txt') {
        return commands
            .execute('docmanager:new-untitled', {
            path: cwd,
            type: 'file',
            ext
        })
            .then(model => {
            if (model != undefined) {
                return commands.execute('docmanager:open', {
                    path: model.path,
                    factory: FACTORY
                });
            }
        });
    }
    /**
     * Add the New File command
     *
     * Defaults to Text/.txt if file type data is not specified
     */
    function addCreateNewCommand(commands, browserFactory, trans) {
        commands.addCommand(CommandIDs.createNew, {
            label: args => {
                var _a, _b;
                if (args.isPalette) {
                    return (_a = args.paletteLabel) !== null && _a !== void 0 ? _a : trans.__('New Text File');
                }
                return (_b = args.launcherLabel) !== null && _b !== void 0 ? _b : trans.__('Text File');
            },
            caption: args => { var _a; return (_a = args.caption) !== null && _a !== void 0 ? _a : trans.__('Create a new text file'); },
            icon: args => {
                var _a;
                return args.isPalette
                    ? undefined
                    : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.LabIcon.resolve({
                        icon: (_a = args.iconName) !== null && _a !== void 0 ? _a : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.textEditorIcon
                    });
            },
            execute: args => {
                var _a;
                const cwd = args.cwd || browserFactory.defaultBrowser.model.path;
                return createNew(commands, cwd, (_a = args.fileExt) !== null && _a !== void 0 ? _a : 'txt');
            }
        });
    }
    Commands.addCreateNewCommand = addCreateNewCommand;
    /**
     * Add the New Markdown File command
     */
    function addCreateNewMarkdownCommand(commands, browserFactory, trans) {
        commands.addCommand(CommandIDs.createNewMarkdown, {
            label: args => args['isPalette']
                ? trans.__('New Markdown File')
                : trans.__('Markdown File'),
            caption: trans.__('Create a new markdown file'),
            icon: args => (args['isPalette'] ? undefined : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.markdownIcon),
            execute: args => {
                const cwd = args['cwd'] || browserFactory.defaultBrowser.model.path;
                return createNew(commands, cwd, 'md');
            }
        });
    }
    Commands.addCreateNewMarkdownCommand = addCreateNewMarkdownCommand;
    /**
     * Wrapper function for adding the default launcher items for File Editor
     */
    function addLauncherItems(launcher, trans) {
        addCreateNewToLauncher(launcher, trans);
        addCreateNewMarkdownToLauncher(launcher, trans);
    }
    Commands.addLauncherItems = addLauncherItems;
    /**
     * Add Create New Text File to the Launcher
     */
    function addCreateNewToLauncher(launcher, trans) {
        launcher.add({
            command: CommandIDs.createNew,
            category: trans.__('Other'),
            rank: 1
        });
    }
    Commands.addCreateNewToLauncher = addCreateNewToLauncher;
    /**
     * Add Create New Markdown to the Launcher
     */
    function addCreateNewMarkdownToLauncher(launcher, trans) {
        launcher.add({
            command: CommandIDs.createNewMarkdown,
            category: trans.__('Other'),
            rank: 2
        });
    }
    Commands.addCreateNewMarkdownToLauncher = addCreateNewMarkdownToLauncher;
    /**
     * Add ___ File items to the Launcher for common file types associated with available kernels
     */
    function addKernelLanguageLauncherItems(launcher, trans, availableKernelFileTypes) {
        for (let ext of availableKernelFileTypes) {
            launcher.add({
                command: CommandIDs.createNew,
                category: trans.__('Other'),
                rank: 3,
                args: ext
            });
        }
    }
    Commands.addKernelLanguageLauncherItems = addKernelLanguageLauncherItems;
    /**
     * Wrapper function for adding the default items to the File Editor palette
     */
    function addPaletteItems(palette, trans) {
        addChangeTabsCommandsToPalette(palette, trans);
        addCreateNewCommandToPalette(palette, trans);
        addCreateNewMarkdownCommandToPalette(palette, trans);
        addChangeFontSizeCommandsToPalette(palette, trans);
    }
    Commands.addPaletteItems = addPaletteItems;
    /**
     * Add commands to change the tab indentation to the File Editor palette
     */
    function addChangeTabsCommandsToPalette(palette, trans) {
        const paletteCategory = trans.__('Text Editor');
        const args = {
            insertSpaces: false,
            size: 4
        };
        const command = CommandIDs.changeTabs;
        palette.addItem({ command, args, category: paletteCategory });
        for (const size of [1, 2, 4, 8]) {
            const args = {
                insertSpaces: true,
                size
            };
            palette.addItem({ command, args, category: paletteCategory });
        }
    }
    Commands.addChangeTabsCommandsToPalette = addChangeTabsCommandsToPalette;
    /**
     * Add a Create New File command to the File Editor palette
     */
    function addCreateNewCommandToPalette(palette, trans) {
        const paletteCategory = trans.__('Text Editor');
        palette.addItem({
            command: CommandIDs.createNew,
            args: { isPalette: true },
            category: paletteCategory
        });
    }
    Commands.addCreateNewCommandToPalette = addCreateNewCommandToPalette;
    /**
     * Add a Create New Markdown command to the File Editor palette
     */
    function addCreateNewMarkdownCommandToPalette(palette, trans) {
        const paletteCategory = trans.__('Text Editor');
        palette.addItem({
            command: CommandIDs.createNewMarkdown,
            args: { isPalette: true },
            category: paletteCategory
        });
    }
    Commands.addCreateNewMarkdownCommandToPalette = addCreateNewMarkdownCommandToPalette;
    /**
     * Add commands to change the font size to the File Editor palette
     */
    function addChangeFontSizeCommandsToPalette(palette, trans) {
        const paletteCategory = trans.__('Text Editor');
        const command = CommandIDs.changeFontSize;
        let args = { delta: 1 };
        palette.addItem({ command, args, category: paletteCategory });
        args = { delta: -1 };
        palette.addItem({ command, args, category: paletteCategory });
    }
    Commands.addChangeFontSizeCommandsToPalette = addChangeFontSizeCommandsToPalette;
    /**
     * Add New ___ File commands to the File Editor palette for common file types associated with available kernels
     */
    function addKernelLanguagePaletteItems(palette, trans, availableKernelFileTypes) {
        const paletteCategory = trans.__('Text Editor');
        for (let ext of availableKernelFileTypes) {
            palette.addItem({
                command: CommandIDs.createNew,
                args: Object.assign(Object.assign({}, ext), { isPalette: true }),
                category: paletteCategory
            });
        }
    }
    Commands.addKernelLanguagePaletteItems = addKernelLanguagePaletteItems;
    /**
     * Wrapper function for adding the default menu items for File Editor
     */
    function addMenuItems(menu, commands, tracker, trans, consoleTracker, sessionDialogs) {
        // Add undo/redo hooks to the edit menu.
        addUndoRedoToEditMenu(menu, tracker);
        // Add editor view options.
        addEditorViewerToViewMenu(menu, tracker);
        // Add a console creator the the file menu.
        addConsoleCreatorToFileMenu(menu, commands, tracker, trans);
        // Add a code runner to the run menu.
        if (consoleTracker) {
            addCodeRunnersToRunMenu(menu, commands, tracker, consoleTracker, trans, sessionDialogs);
        }
    }
    Commands.addMenuItems = addMenuItems;
    /**
     * Add Create New ___ File commands to the File menu for common file types associated with available kernels
     */
    function addKernelLanguageMenuItems(menu, availableKernelFileTypes) {
        for (let ext of availableKernelFileTypes) {
            menu.fileMenu.newMenu.addItem({
                command: CommandIDs.createNew,
                args: ext,
                rank: 31
            });
        }
    }
    Commands.addKernelLanguageMenuItems = addKernelLanguageMenuItems;
    /**
     * Add File Editor undo and redo widgets to the Edit menu
     */
    function addUndoRedoToEditMenu(menu, tracker) {
        menu.editMenu.undoers.add({
            tracker,
            undo: widget => {
                widget.content.editor.undo();
            },
            redo: widget => {
                widget.content.editor.redo();
            }
        });
    }
    Commands.addUndoRedoToEditMenu = addUndoRedoToEditMenu;
    /**
     * Add a File Editor editor viewer to the View Menu
     */
    function addEditorViewerToViewMenu(menu, tracker) {
        menu.viewMenu.editorViewers.add({
            tracker,
            toggleLineNumbers: widget => {
                const lineNumbers = !widget.content.editor.getOption('lineNumbers');
                widget.content.editor.setOption('lineNumbers', lineNumbers);
            },
            toggleWordWrap: widget => {
                const oldValue = widget.content.editor.getOption('lineWrap');
                const newValue = oldValue === 'off' ? 'on' : 'off';
                widget.content.editor.setOption('lineWrap', newValue);
            },
            toggleMatchBrackets: widget => {
                const matchBrackets = !widget.content.editor.getOption('matchBrackets');
                widget.content.editor.setOption('matchBrackets', matchBrackets);
            },
            lineNumbersToggled: widget => widget.content.editor.getOption('lineNumbers'),
            wordWrapToggled: widget => widget.content.editor.getOption('lineWrap') !== 'off',
            matchBracketsToggled: widget => widget.content.editor.getOption('matchBrackets')
        });
    }
    Commands.addEditorViewerToViewMenu = addEditorViewerToViewMenu;
    /**
     * Add a File Editor console creator to the File menu
     */
    function addConsoleCreatorToFileMenu(menu, commands, tracker, trans) {
        const createConsole = getCreateConsoleFunction(commands);
        menu.fileMenu.consoleCreators.add({
            tracker,
            createConsoleLabel: (n) => trans.__('Create Console for Editor'),
            createConsole
        });
    }
    Commands.addConsoleCreatorToFileMenu = addConsoleCreatorToFileMenu;
    /**
     * Add a File Editor code runner to the Run menu
     */
    function addCodeRunnersToRunMenu(menu, commands, tracker, consoleTracker, trans, sessionDialogs) {
        menu.runMenu.codeRunners.add({
            tracker,
            runLabel: (n) => trans.__('Run Code'),
            runAllLabel: (n) => trans.__('Run All Code'),
            restartAndRunAllLabel: (n) => trans.__('Restart Kernel and Run All Code'),
            isEnabled: current => !!consoleTracker.find(widget => { var _a; return ((_a = widget.sessionContext.session) === null || _a === void 0 ? void 0 : _a.path) === current.context.path; }),
            run: () => commands.execute(CommandIDs.runCode),
            runAll: () => commands.execute(CommandIDs.runAllCode),
            restartAndRunAll: current => {
                const widget = consoleTracker.find(widget => { var _a; return ((_a = widget.sessionContext.session) === null || _a === void 0 ? void 0 : _a.path) === current.context.path; });
                if (widget) {
                    return (sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs)
                        .restart(widget.sessionContext)
                        .then(restarted => {
                        if (restarted) {
                            void commands.execute(CommandIDs.runAllCode);
                        }
                        return restarted;
                    });
                }
            }
        });
    }
    Commands.addCodeRunnersToRunMenu = addCodeRunnersToRunMenu;
})(Commands || (Commands = {}));
//# sourceMappingURL=commands.js.map

/***/ }),

/***/ "../../packages/fileeditor-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/fileeditor-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Commands": () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_12__.Commands),
/* harmony export */   "tabSpaceStatus": () => (/* binding */ tabSpaceStatus),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./commands */ "../../packages/fileeditor-extension/lib/commands.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module fileeditor-extension
 */














/**
 * The editor tracker extension.
 */
const plugin = {
    activate,
    id: '@jupyterlab/fileeditor-extension:plugin',
    requires: [
        _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__.ISettingRegistry,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_10__.ITranslator
    ],
    optional: [
        _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.IConsoleTracker,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_6__.ILauncher,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_7__.IMainMenu,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry
    ],
    provides: _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__.IEditorTracker,
    autoStart: true
};
/**
 * A plugin that provides a status item allowing the user to
 * switch tabs vs spaces and tab widths for text editors.
 */
const tabSpaceStatus = {
    id: '@jupyterlab/fileeditor-extension:tab-space-status',
    autoStart: true,
    requires: [_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__.IEditorTracker, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_10__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_9__.IStatusBar],
    activate: (app, editorTracker, settingRegistry, translator, statusBar) => {
        const trans = translator.load('jupyterlab');
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        // Create a menu for switching tabs vs spaces.
        const menu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__.Menu({ commands: app.commands });
        const command = 'fileeditor:change-tabs';
        const { shell } = app;
        const args = {
            insertSpaces: false,
            size: 4,
            name: trans.__('Indent with Tab')
        };
        menu.addItem({ command, args });
        for (const size of [1, 2, 4, 8]) {
            const args = {
                insertSpaces: true,
                size,
                name: trans._n('Spaces: %1', 'Spaces: %1', size)
            };
            menu.addItem({ command, args });
        }
        // Create the status item.
        const item = new _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__.TabSpaceStatus({ menu, translator });
        // Keep a reference to the code editor config from the settings system.
        const updateSettings = (settings) => {
            item.model.config = Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.CodeEditor.defaultConfig), settings.get('editorConfig').composite);
        };
        void Promise.all([
            settingRegistry.load('@jupyterlab/fileeditor-extension:plugin'),
            app.restored
        ]).then(([settings]) => {
            updateSettings(settings);
            settings.changed.connect(updateSettings);
        });
        // Add the status item.
        statusBar.registerStatusItem('@jupyterlab/fileeditor-extension:tab-space-status', {
            item,
            align: 'right',
            rank: 1,
            isActive: () => {
                return (!!shell.currentWidget && editorTracker.has(shell.currentWidget));
            }
        });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [plugin, tabSpaceStatus];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * Activate the editor tracker plugin.
 */
function activate(app, editorServices, browserFactory, settingRegistry, translator, consoleTracker, palette, launcher, menu, restorer, sessionDialogs, toolbarRegistry) {
    const id = plugin.id;
    const trans = translator.load('jupyterlab');
    const namespace = 'editor';
    let toolbarFactory;
    if (toolbarRegistry) {
        toolbarFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settingRegistry, _commands__WEBPACK_IMPORTED_MODULE_12__.FACTORY, id, translator);
    }
    const factory = new _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_5__.FileEditorFactory({
        editorServices,
        factoryOptions: {
            name: _commands__WEBPACK_IMPORTED_MODULE_12__.FACTORY,
            fileTypes: ['markdown', '*'],
            defaultFor: ['markdown', '*'],
            toolbarFactory,
            translator
        }
    });
    const { commands, restored, shell } = app;
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    const isEnabled = () => tracker.currentWidget !== null &&
        tracker.currentWidget === shell.currentWidget;
    const commonLanguageFileTypeData = new Map([
        [
            'python',
            [
                {
                    fileExt: 'py',
                    iconName: 'ui-components:python',
                    launcherLabel: trans.__('Python File'),
                    paletteLabel: trans.__('New Python File'),
                    caption: trans.__('Create a new Python file')
                }
            ]
        ],
        [
            'julia',
            [
                {
                    fileExt: 'jl',
                    iconName: 'ui-components:julia',
                    launcherLabel: trans.__('Julia File'),
                    paletteLabel: trans.__('New Julia File'),
                    caption: trans.__('Create a new Julia file')
                }
            ]
        ],
        [
            'R',
            [
                {
                    fileExt: 'r',
                    iconName: 'ui-components:r-kernel',
                    launcherLabel: trans.__('R File'),
                    paletteLabel: trans.__('New R File'),
                    caption: trans.__('Create a new R file')
                }
            ]
        ]
    ]);
    // Use available kernels to determine which common file types should have 'Create New' options in the Launcher, File Editor palette, and File menu
    const getAvailableKernelFileTypes = async () => {
        var _a, _b;
        const specsManager = app.serviceManager.kernelspecs;
        await specsManager.ready;
        let fileTypes = new Set();
        const specs = (_b = (_a = specsManager.specs) === null || _a === void 0 ? void 0 : _a.kernelspecs) !== null && _b !== void 0 ? _b : {};
        Object.keys(specs).forEach(spec => {
            const specModel = specs[spec];
            if (specModel) {
                const exts = commonLanguageFileTypeData.get(specModel.language);
                exts === null || exts === void 0 ? void 0 : exts.forEach(ext => fileTypes.add(ext));
            }
        });
        return fileTypes;
    };
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({ path: widget.context.path, factory: _commands__WEBPACK_IMPORTED_MODULE_12__.FACTORY }),
            name: widget => widget.context.path
        });
    }
    // Add a console creator to the File menu
    // Fetch the initial state of the settings.
    Promise.all([settingRegistry.load(id), restored])
        .then(([settings]) => {
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateSettings(settings, commands);
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateTracker(tracker);
        settings.changed.connect(() => {
            _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateSettings(settings, commands);
            _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateTracker(tracker);
        });
    })
        .catch((reason) => {
        console.error(reason.message);
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateTracker(tracker);
    });
    factory.widgetCreated.connect((sender, widget) => {
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        void tracker.add(widget);
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateWidget(widget.content);
    });
    app.docRegistry.addWidgetFactory(factory);
    // Handle the settings of new widgets.
    tracker.widgetAdded.connect((sender, widget) => {
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.updateWidget(widget.content);
    });
    _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addCommands(commands, settingRegistry, trans, id, isEnabled, tracker, browserFactory);
    // Add a launcher item if the launcher is available.
    if (launcher) {
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addLauncherItems(launcher, trans);
    }
    if (palette) {
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addPaletteItems(palette, trans);
    }
    if (menu) {
        _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addMenuItems(menu, commands, tracker, trans, consoleTracker, sessionDialogs);
    }
    getAvailableKernelFileTypes()
        .then(availableKernelFileTypes => {
        if (launcher) {
            _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addKernelLanguageLauncherItems(launcher, trans, availableKernelFileTypes);
        }
        if (palette) {
            _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addKernelLanguagePaletteItems(palette, trans, availableKernelFileTypes);
        }
        if (menu) {
            _commands__WEBPACK_IMPORTED_MODULE_12__.Commands.addKernelLanguageMenuItems(menu, availableKernelFileTypes);
        }
    })
        .catch((reason) => {
        console.error(reason.message);
    });
    return tracker;
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWVkaXRvci1leHRlbnNpb24vbGliL2NvbW1hbmRzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9maWxlZWRpdG9yLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ3dFO0FBQ3BCO0FBQ2dCO0FBQzZFO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNEVBQXdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLEVBQUUsNEVBQXdCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDOUI7QUFDQSxZQUFZLCtEQUF1QjtBQUNuQyxZQUFZLDhEQUFzQjtBQUNsQyxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDhEQUFzQjtBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRLDZEQUFxQjtBQUM3QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBcUI7QUFDN0IsS0FBSztBQUNMLElBQUksNERBQW9CO0FBQ3hCO0FBQ0E7QUFDQSxRQUFRLGlFQUF5QjtBQUNqQztBQUNBO0FBQ0EsUUFBUSxnRUFBd0I7QUFDaEM7QUFDQTtBQUNBLFFBQVEsNkRBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrRUFBdUM7QUFDbkQ7QUFDQTtBQUNBLFlBQVksOEVBQXNDO0FBQ2xEO0FBQ0E7QUFDQSxZQUFZLDJFQUFtQztBQUMvQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQyIsImZpbGUiOiJwYWNrYWdlc19maWxlZWRpdG9yLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuZWY0YzkyMmFmNmFiMTMwNTNkYTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBDbGlwYm9hcmQsIHNlc3Npb25Db250ZXh0RGlhbG9ncyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVFZGl0b3IgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IE1hcmtkb3duQ29kZUJsb2NrcywgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBjb25zb2xlSWNvbiwgY29weUljb24sIGN1dEljb24sIExhYkljb24sIG1hcmtkb3duSWNvbiwgcGFzdGVJY29uLCByZWRvSWNvbiwgdGV4dEVkaXRvckljb24sIHVuZG9JY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5jb25zdCBhdXRvQ2xvc2luZ0JyYWNrZXRzTm90ZWJvb2sgPSAnbm90ZWJvb2s6dG9nZ2xlLWF1dG9jbG9zaW5nLWJyYWNrZXRzJztcbmNvbnN0IGF1dG9DbG9zaW5nQnJhY2tldHNDb25zb2xlID0gJ2NvbnNvbGU6dG9nZ2xlLWF1dG9jbG9zaW5nLWJyYWNrZXRzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGZpbGVlZGl0b3IgcGx1Z2luLlxuICovXG5leHBvcnQgdmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmNyZWF0ZU5ldyA9ICdmaWxlZWRpdG9yOmNyZWF0ZS1uZXcnO1xuICAgIENvbW1hbmRJRHMuY3JlYXRlTmV3TWFya2Rvd24gPSAnZmlsZWVkaXRvcjpjcmVhdGUtbmV3LW1hcmtkb3duLWZpbGUnO1xuICAgIENvbW1hbmRJRHMuY2hhbmdlRm9udFNpemUgPSAnZmlsZWVkaXRvcjpjaGFuZ2UtZm9udC1zaXplJztcbiAgICBDb21tYW5kSURzLmxpbmVOdW1iZXJzID0gJ2ZpbGVlZGl0b3I6dG9nZ2xlLWxpbmUtbnVtYmVycyc7XG4gICAgQ29tbWFuZElEcy5saW5lV3JhcCA9ICdmaWxlZWRpdG9yOnRvZ2dsZS1saW5lLXdyYXAnO1xuICAgIENvbW1hbmRJRHMuY2hhbmdlVGFicyA9ICdmaWxlZWRpdG9yOmNoYW5nZS10YWJzJztcbiAgICBDb21tYW5kSURzLm1hdGNoQnJhY2tldHMgPSAnZmlsZWVkaXRvcjp0b2dnbGUtbWF0Y2gtYnJhY2tldHMnO1xuICAgIENvbW1hbmRJRHMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9ICdmaWxlZWRpdG9yOnRvZ2dsZS1hdXRvY2xvc2luZy1icmFja2V0cyc7XG4gICAgQ29tbWFuZElEcy5hdXRvQ2xvc2luZ0JyYWNrZXRzVW5pdmVyc2FsID0gJ2ZpbGVlZGl0b3I6dG9nZ2xlLWF1dG9jbG9zaW5nLWJyYWNrZXRzLXVuaXZlcnNhbCc7XG4gICAgQ29tbWFuZElEcy5jcmVhdGVDb25zb2xlID0gJ2ZpbGVlZGl0b3I6Y3JlYXRlLWNvbnNvbGUnO1xuICAgIENvbW1hbmRJRHMucmVwbGFjZVNlbGVjdGlvbiA9ICdmaWxlZWRpdG9yOnJlcGxhY2Utc2VsZWN0aW9uJztcbiAgICBDb21tYW5kSURzLnJ1bkNvZGUgPSAnZmlsZWVkaXRvcjpydW4tY29kZSc7XG4gICAgQ29tbWFuZElEcy5ydW5BbGxDb2RlID0gJ2ZpbGVlZGl0b3I6cnVuLWFsbCc7XG4gICAgQ29tbWFuZElEcy5tYXJrZG93blByZXZpZXcgPSAnZmlsZWVkaXRvcjptYXJrZG93bi1wcmV2aWV3JztcbiAgICBDb21tYW5kSURzLnVuZG8gPSAnZmlsZWVkaXRvcjp1bmRvJztcbiAgICBDb21tYW5kSURzLnJlZG8gPSAnZmlsZWVkaXRvcjpyZWRvJztcbiAgICBDb21tYW5kSURzLmN1dCA9ICdmaWxlZWRpdG9yOmN1dCc7XG4gICAgQ29tbWFuZElEcy5jb3B5ID0gJ2ZpbGVlZGl0b3I6Y29weSc7XG4gICAgQ29tbWFuZElEcy5wYXN0ZSA9ICdmaWxlZWRpdG9yOnBhc3RlJztcbiAgICBDb21tYW5kSURzLnNlbGVjdEFsbCA9ICdmaWxlZWRpdG9yOnNlbGVjdC1hbGwnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBlZGl0b3Igd2lkZ2V0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBQ1RPUlkgPSAnRWRpdG9yJztcbmNvbnN0IHVzZXJTZXR0aW5ncyA9IFtcbiAgICAnYXV0b0Nsb3NpbmdCcmFja2V0cycsXG4gICAgJ2NvZGVGb2xkaW5nJyxcbiAgICAnY3Vyc29yQmxpbmtSYXRlJyxcbiAgICAnZm9udEZhbWlseScsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAnaW5zZXJ0U3BhY2VzJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ2xpbmVOdW1iZXJzJyxcbiAgICAnbGluZVdyYXAnLFxuICAgICdtYXRjaEJyYWNrZXRzJyxcbiAgICAncmVhZE9ubHknLFxuICAgICdydWxlcnMnLFxuICAgICdzaG93VHJhaWxpbmdTcGFjZScsXG4gICAgJ3RhYlNpemUnLFxuICAgICd3b3JkV3JhcENvbHVtbidcbl07XG5mdW5jdGlvbiBmaWx0ZXJVc2VyU2V0dGluZ3MoY29uZmlnKSB7XG4gICAgY29uc3QgZmlsdGVyZWRDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIC8vIERlbGV0ZSBwYXJ0cyBvZiB0aGUgY29uZmlnIHRoYXQgYXJlIG5vdCB1c2VyIHNldHRpbmdzIChsaWtlIGhhbmRsZVBhc3RlKS5cbiAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKGNvbmZpZykpIHtcbiAgICAgICAgaWYgKCF1c2VyU2V0dGluZ3MuaW5jbHVkZXMoaykpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWdba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkQ29uZmlnO1xufVxubGV0IGNvbmZpZyA9IGZpbHRlclVzZXJTZXR0aW5ncyhDb2RlRWRpdG9yLmRlZmF1bHRDb25maWcpO1xuLyoqXG4gKiBBIHV0aWxpdHkgY2xhc3MgZm9yIGFkZGluZyBjb21tYW5kcyBhbmQgbWVudSBpdGVtcyxcbiAqIGZvciB1c2UgYnkgdGhlIEZpbGUgRWRpdG9yIGV4dGVuc2lvbiBvciBvdGhlciBFZGl0b3IgZXh0ZW5zaW9ucy5cbiAqL1xuZXhwb3J0IHZhciBDb21tYW5kcztcbihmdW5jdGlvbiAoQ29tbWFuZHMpIHtcbiAgICAvKipcbiAgICAgKiBBY2Nlc3NvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyZWF0ZUNvbnNvbGUgZnVuY3Rpb24gZm9yIHVzZSBieSBDcmVhdGUgQ29uc29sZSBjb21tYW5kc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENyZWF0ZUNvbnNvbGVGdW5jdGlvbihjb21tYW5kcykge1xuICAgICAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29uc29sZSh3aWRnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgY29uc29sZSA9IGF3YWl0IGNvbW1hbmRzLmV4ZWN1dGUoJ2NvbnNvbGU6Y3JlYXRlJywge1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlOiBvcHRpb25zWydhY3RpdmF0ZSddLFxuICAgICAgICAgICAgICAgIG5hbWU6IChfYSA9IHdpZGdldC5jb250ZXh0LmNvbnRlbnRzTW9kZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lLFxuICAgICAgICAgICAgICAgIHBhdGg6IHdpZGdldC5jb250ZXh0LnBhdGgsXG4gICAgICAgICAgICAgICAgcHJlZmVycmVkTGFuZ3VhZ2U6IHdpZGdldC5jb250ZXh0Lm1vZGVsLmRlZmF1bHRLZXJuZWxMYW5ndWFnZSxcbiAgICAgICAgICAgICAgICByZWY6IHdpZGdldC5pZCxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAnc3BsaXQtYm90dG9tJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aWRnZXQuY29udGV4dC5wYXRoQ2hhbmdlZC5jb25uZWN0KChzZW5kZXIsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuc2Vzc2lvbi5zZXRQYXRoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLnNlc3Npb24uc2V0TmFtZSgoX2EgPSB3aWRnZXQuY29udGV4dC5jb250ZW50c01vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5nIHZhbHVlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncywgY29tbWFuZHMpIHtcbiAgICAgICAgY29uZmlnID0gZmlsdGVyVXNlclNldHRpbmdzKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0Q29uZmlnKSwgc2V0dGluZ3MuZ2V0KCdlZGl0b3JDb25maWcnKS5jb21wb3NpdGUpKTtcbiAgICAgICAgLy8gVHJpZ2dlciBhIHJlZnJlc2ggb2YgdGhlIHJlbmRlcmVkIGNvbW1hbmRzXG4gICAgICAgIGNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgfVxuICAgIENvbW1hbmRzLnVwZGF0ZVNldHRpbmdzID0gdXBkYXRlU2V0dGluZ3M7XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5ncyBvZiB0aGUgY3VycmVudCB0cmFja2VyIGluc3RhbmNlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVUcmFja2VyKHRyYWNrZXIpIHtcbiAgICAgICAgdHJhY2tlci5mb3JFYWNoKHdpZGdldCA9PiB7XG4gICAgICAgICAgICB1cGRhdGVXaWRnZXQod2lkZ2V0LmNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMudXBkYXRlVHJhY2tlciA9IHVwZGF0ZVRyYWNrZXI7XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5ncyBvZiBhIHdpZGdldC5cbiAgICAgKiBTa2lwIGdsb2JhbCBzZXR0aW5ncyBmb3IgdHJhbnNpZW50IGVkaXRvciBzcGVjaWZpYyBjb25maWdzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVdpZGdldCh3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gd2lkZ2V0LmVkaXRvcjtcbiAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSk7XG4gICAgfVxuICAgIENvbW1hbmRzLnVwZGF0ZVdpZGdldCA9IHVwZGF0ZVdpZGdldDtcbiAgICAvKipcbiAgICAgKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBhZGRpbmcgdGhlIGRlZmF1bHQgRmlsZSBFZGl0b3IgY29tbWFuZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDb21tYW5kcyhjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQsIGlzRW5hYmxlZCwgdHJhY2tlciwgYnJvd3NlckZhY3RvcnkpIHtcbiAgICAgICAgLy8gQWRkIGEgY29tbWFuZCB0byBjaGFuZ2UgZm9udCBzaXplLlxuICAgICAgICBhZGRDaGFuZ2VGb250U2l6ZUNvbW1hbmQoY29tbWFuZHMsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnMsIGlkKTtcbiAgICAgICAgYWRkTGluZU51bWJlcnNDb21tYW5kKGNvbW1hbmRzLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zLCBpZCwgaXNFbmFibGVkKTtcbiAgICAgICAgYWRkV29yZFdyYXBDb21tYW5kKGNvbW1hbmRzLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zLCBpZCwgaXNFbmFibGVkKTtcbiAgICAgICAgYWRkQ2hhbmdlVGFic0NvbW1hbmQoY29tbWFuZHMsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnMsIGlkKTtcbiAgICAgICAgYWRkTWF0Y2hCcmFja2V0c0NvbW1hbmQoY29tbWFuZHMsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnMsIGlkLCBpc0VuYWJsZWQpO1xuICAgICAgICBhZGRBdXRvQ2xvc2luZ0JyYWNrZXRzQ29tbWFuZChjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQpO1xuICAgICAgICBhZGRSZXBsYWNlU2VsZWN0aW9uQ29tbWFuZChjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGlzRW5hYmxlZCk7XG4gICAgICAgIGFkZENyZWF0ZUNvbnNvbGVDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKTtcbiAgICAgICAgYWRkUnVuQ29kZUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpO1xuICAgICAgICBhZGRSdW5BbGxDb2RlQ29tbWFuZChjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGlzRW5hYmxlZCk7XG4gICAgICAgIGFkZE1hcmtkb3duUHJldmlld0NvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zKTtcbiAgICAgICAgLy8gQWRkIGEgY29tbWFuZCBmb3IgY3JlYXRpbmcgYSBuZXcgdGV4dCBmaWxlLlxuICAgICAgICBhZGRDcmVhdGVOZXdDb21tYW5kKGNvbW1hbmRzLCBicm93c2VyRmFjdG9yeSwgdHJhbnMpO1xuICAgICAgICAvLyBBZGQgYSBjb21tYW5kIGZvciBjcmVhdGluZyBhIG5ldyBNYXJrZG93biBmaWxlLlxuICAgICAgICBhZGRDcmVhdGVOZXdNYXJrZG93bkNvbW1hbmQoY29tbWFuZHMsIGJyb3dzZXJGYWN0b3J5LCB0cmFucyk7XG4gICAgICAgIGFkZFVuZG9Db21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKTtcbiAgICAgICAgYWRkUmVkb0NvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpO1xuICAgICAgICBhZGRDdXRDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKTtcbiAgICAgICAgYWRkQ29weUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpO1xuICAgICAgICBhZGRQYXN0ZUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpO1xuICAgICAgICBhZGRTZWxlY3RBbGxDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ29tbWFuZHMgPSBhZGRDb21tYW5kcztcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjb21tYW5kIHRvIGNoYW5nZSBmb250IHNpemUgZm9yIEZpbGUgRWRpdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ2hhbmdlRm9udFNpemVDb21tYW5kKGNvbW1hbmRzLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zLCBpZCkge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY2hhbmdlRm9udFNpemUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gTnVtYmVyKGFyZ3NbJ2RlbHRhJ10pO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4oZGVsdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Q29tbWFuZElEcy5jaGFuZ2VGb250U2l6ZX06IGRlbHRhIGFyZyBtdXN0IGJlIGEgbnVtYmVyYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc1NpemUgPSBwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLWpwLWNvZGUtZm9udC1zaXplJyksIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2l6ZSA9IGNvbmZpZy5mb250U2l6ZSB8fCBjc3NTaXplO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5mb250U2l6ZSA9IGN1cnJlbnRTaXplICsgZGVsdGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdSZWdpc3RyeVxuICAgICAgICAgICAgICAgICAgICAuc2V0KGlkLCAnZWRpdG9yQ29uZmlnJywgY29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0ICR7aWR9OiAke3JlYXNvbi5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBhcmdzLmRlbHRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3MuaXNNZW51XG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRyYW5zLl9fKCdJbmNyZWFzZSBUZXh0IEVkaXRvciBGb250IFNpemUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0cmFucy5fXygnSW5jcmVhc2UgRm9udCBTaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJncy5pc01lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdHJhbnMuX18oJ0RlY3JlYXNlIFRleHQgRWRpdG9yIEZvbnQgU2l6ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRyYW5zLl9fKCdEZWNyZWFzZSBGb250IFNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRDaGFuZ2VGb250U2l6ZUNvbW1hbmQgPSBhZGRDaGFuZ2VGb250U2l6ZUNvbW1hbmQ7XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBMaW5lIE51bWJlcnMgY29tbWFuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZExpbmVOdW1iZXJzQ29tbWFuZChjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQsIGlzRW5hYmxlZCkge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubGluZU51bWJlcnMsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25maWcubGluZU51bWJlcnMgPSAhY29uZmlnLmxpbmVOdW1iZXJzO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgICAgICAgICAgLnNldChpZCwgJ2VkaXRvckNvbmZpZycsIGNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNldCAke2lkfTogJHtyZWFzb24ubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IGNvbmZpZy5saW5lTnVtYmVycyxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnTGluZSBOdW1iZXJzJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZExpbmVOdW1iZXJzQ29tbWFuZCA9IGFkZExpbmVOdW1iZXJzQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIFdvcmQgV3JhcCBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkV29yZFdyYXBDb21tYW5kKGNvbW1hbmRzLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zLCBpZCwgaXNFbmFibGVkKSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5saW5lV3JhcCwge1xuICAgICAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXcmFwID0gYXJnc1snbW9kZSddIHx8ICdvZmYnO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgICAgICAgICAgLnNldChpZCwgJ2VkaXRvckNvbmZpZycsIGNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNldCAke2lkfTogJHtyZWFzb24ubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgICAgICBpc1RvZ2dsZWQ6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVXcmFwID0gYXJnc1snbW9kZSddIHx8ICdvZmYnO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcubGluZVdyYXAgPT09IGxpbmVXcmFwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnV29yZCBXcmFwJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZFdvcmRXcmFwQ29tbWFuZCA9IGFkZFdvcmRXcmFwQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgY29tbWFuZCBmb3IgY2hhbmdpbmcgdGFicyBzaXplIG9yIHR5cGUgaW4gRmlsZSBFZGl0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDaGFuZ2VUYWJzQ29tbWFuZChjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNoYW5nZVRhYnMsIHtcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuaW5zZXJ0U3BhY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFucy5fbignU3BhY2VzOiAlMScsICdTcGFjZXM6ICUxJywgKF9hID0gYXJncy5zaXplKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnSW5kZW50IHdpdGggVGFiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZy50YWJTaXplID0gYXJnc1snc2l6ZSddIHx8IDQ7XG4gICAgICAgICAgICAgICAgY29uZmlnLmluc2VydFNwYWNlcyA9ICEhYXJnc1snaW5zZXJ0U3BhY2VzJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdSZWdpc3RyeVxuICAgICAgICAgICAgICAgICAgICAuc2V0KGlkLCAnZWRpdG9yQ29uZmlnJywgY29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0ICR7aWR9OiAke3JlYXNvbi5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0U3BhY2VzID0gISFhcmdzWydpbnNlcnRTcGFjZXMnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gYXJnc1snc2l6ZSddIHx8IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5pbnNlcnRTcGFjZXMgPT09IGluc2VydFNwYWNlcyAmJiBjb25maWcudGFiU2l6ZSA9PT0gc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENoYW5nZVRhYnNDb21tYW5kID0gYWRkQ2hhbmdlVGFic0NvbW1hbmQ7XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBNYXRjaCBCcmFja2V0cyBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkTWF0Y2hCcmFja2V0c0NvbW1hbmQoY29tbWFuZHMsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnMsIGlkLCBpc0VuYWJsZWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hdGNoQnJhY2tldHMsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25maWcubWF0Y2hCcmFja2V0cyA9ICFjb25maWcubWF0Y2hCcmFja2V0cztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ1JlZ2lzdHJ5XG4gICAgICAgICAgICAgICAgICAgIC5zZXQoaWQsICdlZGl0b3JDb25maWcnLCBjb25maWcpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBzZXQgJHtpZH06ICR7cmVhc29uLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdNYXRjaCBCcmFja2V0cycpLFxuICAgICAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiBjb25maWcubWF0Y2hCcmFja2V0c1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkTWF0Y2hCcmFja2V0c0NvbW1hbmQgPSBhZGRNYXRjaEJyYWNrZXRzQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIEF1dG8gQ2xvc2UgQnJhY2tldHMgZm9yIFRleHQgRWRpdG9yIGNvbW1hbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRBdXRvQ2xvc2luZ0JyYWNrZXRzQ29tbWFuZChjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmF1dG9DbG9zaW5nQnJhY2tldHMsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25maWcuYXV0b0Nsb3NpbmdCcmFja2V0cyA9ICEhKChfYSA9IGFyZ3NbJ2ZvcmNlJ10pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICFjb25maWcuYXV0b0Nsb3NpbmdCcmFja2V0cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdSZWdpc3RyeVxuICAgICAgICAgICAgICAgICAgICAuc2V0KGlkLCAnZWRpdG9yQ29uZmlnJywgY29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0ICR7aWR9OiAke3JlYXNvbi5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQXV0byBDbG9zZSBCcmFja2V0cyBmb3IgVGV4dCBFZGl0b3InKSxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gY29uZmlnLmF1dG9DbG9zaW5nQnJhY2tldHNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hdXRvQ2xvc2luZ0JyYWNrZXRzVW5pdmVyc2FsLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW55VG9nZ2xlZCA9IGNvbW1hbmRzLmlzVG9nZ2xlZChDb21tYW5kSURzLmF1dG9DbG9zaW5nQnJhY2tldHMpIHx8XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLmlzVG9nZ2xlZChhdXRvQ2xvc2luZ0JyYWNrZXRzTm90ZWJvb2spIHx8XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLmlzVG9nZ2xlZChhdXRvQ2xvc2luZ0JyYWNrZXRzQ29uc29sZSk7XG4gICAgICAgICAgICAgICAgLy8gaWYgYW55IGF1dG8gY2xvc2luZyBicmFja2V0cyBvcHRpb25zIGlzIHRvZ2dsZWQsIHRvZ2dsZSBib3RoIG9mZlxuICAgICAgICAgICAgICAgIGlmIChhbnlUb2dnbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLmF1dG9DbG9zaW5nQnJhY2tldHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBjb21tYW5kcy5leGVjdXRlKGF1dG9DbG9zaW5nQnJhY2tldHNOb3RlYm9vaywgeyBmb3JjZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgY29tbWFuZHMuZXhlY3V0ZShhdXRvQ2xvc2luZ0JyYWNrZXRzQ29uc29sZSwgeyBmb3JjZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBib3RoIGFyZSBvZmYsIHR1cm4gdGhlbSBvblxuICAgICAgICAgICAgICAgICAgICB2b2lkIGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5hdXRvQ2xvc2luZ0JyYWNrZXRzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBjb21tYW5kcy5leGVjdXRlKGF1dG9DbG9zaW5nQnJhY2tldHNOb3RlYm9vaywgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBjb21tYW5kcy5leGVjdXRlKGF1dG9DbG9zaW5nQnJhY2tldHNDb25zb2xlLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0F1dG8gQ2xvc2UgQnJhY2tldHMnKSxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gY29tbWFuZHMuaXNUb2dnbGVkKENvbW1hbmRJRHMuYXV0b0Nsb3NpbmdCcmFja2V0cykgfHxcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5pc1RvZ2dsZWQoYXV0b0Nsb3NpbmdCcmFja2V0c05vdGVib29rKSB8fFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLmlzVG9nZ2xlZChhdXRvQ2xvc2luZ0JyYWNrZXRzQ29uc29sZSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZEF1dG9DbG9zaW5nQnJhY2tldHNDb21tYW5kID0gYWRkQXV0b0Nsb3NpbmdCcmFja2V0c0NvbW1hbmQ7XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSByZXBsYWNlIHNlbGVjdGlvbiBmb3IgdGV4dCBlZGl0b3IgY29tbWFuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFJlcGxhY2VTZWxlY3Rpb25Db21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZXBsYWNlU2VsZWN0aW9uLCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhcmdzWyd0ZXh0J10gfHwgJyc7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9iID0gKF9hID0gd2lkZ2V0LmNvbnRlbnQuZWRpdG9yKS5yZXBsYWNlU2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGV4dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXBsYWNlIFNlbGVjdGlvbiBpbiBFZGl0b3InKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkUmVwbGFjZVNlbGVjdGlvbkNvbW1hbmQgPSBhZGRSZXBsYWNlU2VsZWN0aW9uQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIENyZWF0ZSBDb25zb2xlIGZvciBFZGl0b3IgY29tbWFuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZENyZWF0ZUNvbnNvbGVDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jcmVhdGVDb25zb2xlLCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0Q3JlYXRlQ29uc29sZUZ1bmN0aW9uKGNvbW1hbmRzKSh3aWRnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZCxcbiAgICAgICAgICAgIGljb246IGNvbnNvbGVJY29uLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDcmVhdGUgQ29uc29sZSBmb3IgRWRpdG9yJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENyZWF0ZUNvbnNvbGVDb21tYW5kID0gYWRkQ3JlYXRlQ29uc29sZUNvbW1hbmQ7XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBSdW4gQ29kZSBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkUnVuQ29kZUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1bkNvZGUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgLy8gUnVuIHRoZSBhcHByb3ByaWF0ZSBjb2RlLCB0YWtpbmcgaW50byBhY2NvdW50IGEgYGBgZmVuY2VkYGBgIGNvZGUgYmxvY2suXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gd2lkZ2V0LmVkaXRvcjtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gd2lkZ2V0LmNvbnRleHQucGF0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBQYXRoRXh0LmV4dG5hbWUocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHN0YXJ0LmNvbHVtbiAhPT0gZW5kLmNvbHVtbiB8fCBzdGFydC5saW5lICE9PSBlbmQubGluZTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBzZWxlY3RlZCBjb2RlIGZyb20gdGhlIGVkaXRvci5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBlZGl0b3IuZ2V0T2Zmc2V0QXQoc2VsZWN0aW9uLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gZWRpdG9yLmdldE9mZnNldEF0KHNlbGVjdGlvbi5lbmQpO1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChNYXJrZG93bkNvZGVCbG9ja3MuaXNNYXJrZG93bihleHRlbnNpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGV4dCB9ID0gZWRpdG9yLm1vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9ja3MgPSBNYXJrZG93bkNvZGVCbG9ja3MuZmluZE1hcmtkb3duQ29kZUJsb2Nrcyh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChibG9jay5zdGFydExpbmUgPD0gc3RhcnQubGluZSAmJiBzdGFydC5saW5lIDw9IGJsb2NrLmVuZExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID0gYmxvY2suY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBubyBzZWxlY3Rpb24sIHN1Ym1pdCB3aG9sZSBsaW5lIGFuZCBhZHZhbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSBlZGl0b3IuZ2V0TGluZShzZWxlY3Rpb24uc3RhcnQubGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3Vyc29yLmxpbmUgKyAxID09PSBlZGl0b3IubGluZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3IubW9kZWwudmFsdWUudGV4dCA9IHRleHQgKyAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yUG9zaXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjdXJzb3IuY29sdW1uXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKCdjb25zb2xlOmluamVjdCcsIHsgYWN0aXZhdGUsIGNvZGUsIHBhdGggfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZCxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnUnVuIENvZGUnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkUnVuQ29kZUNvbW1hbmQgPSBhZGRSdW5Db2RlQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIFJ1biBBbGwgQ29kZSBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkUnVuQWxsQ29kZUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1bkFsbENvZGUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gd2lkZ2V0LmVkaXRvcjtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IHdpZGdldC5jb250ZXh0LnBhdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gUGF0aEV4dC5leHRuYW1lKHBhdGgpO1xuICAgICAgICAgICAgICAgIGlmIChNYXJrZG93bkNvZGVCbG9ja3MuaXNNYXJrZG93bihleHRlbnNpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBNYXJrZG93biBmaWxlcywgcnVuIG9ubHkgY29kZSBibG9ja3MuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrcyA9IE1hcmtkb3duQ29kZUJsb2Nrcy5maW5kTWFya2Rvd25Db2RlQmxvY2tzKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSArPSBibG9jay5jb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gdGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHMuZXhlY3V0ZSgnY29uc29sZTppbmplY3QnLCB7IGFjdGl2YXRlLCBjb2RlLCBwYXRoIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1J1biBBbGwgQ29kZScpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRSdW5BbGxDb2RlQ29tbWFuZCA9IGFkZFJ1bkFsbENvZGVDb21tYW5kO1xuICAgIC8qKlxuICAgICAqIEFkZCBtYXJrZG93biBwcmV2aWV3IGNvbW1hbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRNYXJrZG93blByZXZpZXdDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucykge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubWFya2Rvd25QcmV2aWV3LCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IHdpZGdldC5jb250ZXh0LnBhdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ21hcmtkb3dudmlld2VyOm9wZW4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdzcGxpdC1yaWdodCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzVmlzaWJsZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh3aWRnZXQgJiYgUGF0aEV4dC5leHRuYW1lKHdpZGdldC5jb250ZXh0LnBhdGgpID09PSAnLm1kJykgfHwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IG1hcmtkb3duSWNvbixcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2hvdyBNYXJrZG93biBQcmV2aWV3JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZE1hcmtkb3duUHJldmlld0NvbW1hbmQgPSBhZGRNYXJrZG93blByZXZpZXdDb21tYW5kO1xuICAgIC8qKlxuICAgICAqIEFkZCB1bmRvIGNvbW1hbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRVbmRvQ29tbWFuZChjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGlzRW5hYmxlZCkge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudW5kbywge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmVkaXRvci51bmRvKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmICghaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWRlYWxseSBlbmFibGUgaXQgd2hlbiB0aGVyZSBhcmUgdW5kbyBldmVudHMgc3RvcmVkXG4gICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIGlzc3VlICM4NTkwOiBDb2RlIG1pcnJvciBlZGl0b3IgY291bGQgZXhwb3NlIHRoZSBoaXN0b3J5IG9mIHVuZG8vcmVkbyBldmVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiB1bmRvSWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdVbmRvJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZFVuZG9Db21tYW5kID0gYWRkVW5kb0NvbW1hbmQ7XG4gICAgLyoqXG4gICAgICogQWRkIHJlZG8gY29tbWFuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFJlZG9Db21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWRvLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aWRnZXQuZWRpdG9yLnJlZG8oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZGVhbGx5IGVuYWJsZSBpdCB3aGVuIHRoZXJlIGFyZSByZWRvIGV2ZW50cyBzdG9yZWRcbiAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2UgaXNzdWUgIzg1OTA6IENvZGUgbWlycm9yIGVkaXRvciBjb3VsZCBleHBvc2UgdGhlIGhpc3Rvcnkgb2YgdW5kby9yZWRvIGV2ZW50c1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IHJlZG9JY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlZG8nKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkUmVkb0NvbW1hbmQgPSBhZGRSZWRvQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgY3V0IGNvbW1hbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDdXRDb21tYW5kKGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucywgaXNFbmFibGVkKSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jdXQsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHdpZGdldC5lZGl0b3I7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGdldFRleHRTZWxlY3Rpb24oZWRpdG9yKTtcbiAgICAgICAgICAgICAgICBDbGlwYm9hcmQuY29weVRvU3lzdGVtKHRleHQpO1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uICYmIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKCcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbmFibGUgY29tbWFuZCBpZiB0aGVyZSBpcyBhIHRleHQgc2VsZWN0aW9uIGluIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTZWxlY3RlZCh3aWRnZXQuZWRpdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiBjdXRJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0N1dCcpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRDdXRDb21tYW5kID0gYWRkQ3V0Q29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgY29weSBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ29weUNvbW1hbmQoY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBpc0VuYWJsZWQpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNvcHksIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHdpZGdldC5lZGl0b3I7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGdldFRleHRTZWxlY3Rpb24oZWRpdG9yKTtcbiAgICAgICAgICAgICAgICBDbGlwYm9hcmQuY29weVRvU3lzdGVtKHRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVuYWJsZSBjb21tYW5kIGlmIHRoZXJlIGlzIGEgdGV4dCBzZWxlY3Rpb24gaW4gdGhlIGVkaXRvclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1NlbGVjdGVkKHdpZGdldC5lZGl0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IGNvcHlJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvcHknKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ29weUNvbW1hbmQgPSBhZGRDb3B5Q29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgcGFzdGUgY29tbWFuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFBhc3RlQ29tbWFuZChjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGlzRW5hYmxlZCkge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucGFzdGUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHdpZGdldC5lZGl0b3I7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGRhdGEgZnJvbSBjbGlwYm9hcmRcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmQgPSB3aW5kb3cubmF2aWdhdG9yLmNsaXBib2FyZDtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gYXdhaXQgY2xpcGJvYXJkLnJlYWRUZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzdGUgZGF0YSB0byB0aGUgZWRpdG9yXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uICYmIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKGNsaXBib2FyZERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHsgdmFyIF9hOyByZXR1cm4gQm9vbGVhbihpc0VuYWJsZWQoKSAmJiAoKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudCkpOyB9LFxuICAgICAgICAgICAgaWNvbjogcGFzdGVJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Bhc3RlJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZFBhc3RlQ29tbWFuZCA9IGFkZFBhc3RlQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgc2VsZWN0IGFsbCBjb21tYW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkU2VsZWN0QWxsQ29tbWFuZChjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGlzRW5hYmxlZCkge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2VsZWN0QWxsLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSB3aWRnZXQuZWRpdG9yO1xuICAgICAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnc2VsZWN0QWxsJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiB7IHZhciBfYTsgcmV0dXJuIEJvb2xlYW4oaXNFbmFibGVkKCkgJiYgKChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQpKTsgfSxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2VsZWN0IEFsbCcpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRTZWxlY3RBbGxDb21tYW5kID0gYWRkU2VsZWN0QWxsQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlcmUgaXMgYSB0ZXh0IHNlbGVjdGlvbiBpbiB0aGUgZWRpdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTZWxlY3RlZChlZGl0b3IpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uT2JqID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHNlbGVjdGlvbk9iajtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBzdGFydC5jb2x1bW4gIT09IGVuZC5jb2x1bW4gfHwgc3RhcnQubGluZSAhPT0gZW5kLmxpbmU7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0ZXh0IHNlbGVjdGlvbiBmcm9tIHRoZSBlZGl0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRUZXh0U2VsZWN0aW9uKGVkaXRvcikge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25PYmogPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZWRpdG9yLmdldE9mZnNldEF0KHNlbGVjdGlvbk9iai5zdGFydCk7XG4gICAgICAgIGNvbnN0IGVuZCA9IGVkaXRvci5nZXRPZmZzZXRBdChzZWxlY3Rpb25PYmouZW5kKTtcbiAgICAgICAgY29uc3QgdGV4dCA9IGVkaXRvci5tb2RlbC52YWx1ZS50ZXh0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyB1bnRpdGxlZCB0ZXh0IGZpbGUsIGdpdmVuIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU5ldyhjb21tYW5kcywgY3dkLCBleHQgPSAndHh0Jykge1xuICAgICAgICByZXR1cm4gY29tbWFuZHNcbiAgICAgICAgICAgIC5leGVjdXRlKCdkb2NtYW5hZ2VyOm5ldy11bnRpdGxlZCcsIHtcbiAgICAgICAgICAgIHBhdGg6IGN3ZCxcbiAgICAgICAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgICAgICAgIGV4dFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4obW9kZWwgPT4ge1xuICAgICAgICAgICAgaWYgKG1vZGVsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKCdkb2NtYW5hZ2VyOm9wZW4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IG1vZGVsLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGZhY3Rvcnk6IEZBQ1RPUllcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgTmV3IEZpbGUgY29tbWFuZFxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gVGV4dC8udHh0IGlmIGZpbGUgdHlwZSBkYXRhIGlzIG5vdCBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDcmVhdGVOZXdDb21tYW5kKGNvbW1hbmRzLCBicm93c2VyRmFjdG9yeSwgdHJhbnMpIHtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNyZWF0ZU5ldywge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuaXNQYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2EgPSBhcmdzLnBhbGV0dGVMYWJlbCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJhbnMuX18oJ05ldyBUZXh0IEZpbGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYiA9IGFyZ3MubGF1bmNoZXJMYWJlbCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdHJhbnMuX18oJ1RleHQgRmlsZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhcHRpb246IGFyZ3MgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBhcmdzLmNhcHRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRyYW5zLl9fKCdDcmVhdGUgYSBuZXcgdGV4dCBmaWxlJyk7IH0sXG4gICAgICAgICAgICBpY29uOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3MuaXNQYWxldHRlXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogTGFiSWNvbi5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IChfYSA9IGFyZ3MuaWNvbk5hbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRleHRFZGl0b3JJY29uXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25zdCBjd2QgPSBhcmdzLmN3ZCB8fCBicm93c2VyRmFjdG9yeS5kZWZhdWx0QnJvd3Nlci5tb2RlbC5wYXRoO1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVOZXcoY29tbWFuZHMsIGN3ZCwgKF9hID0gYXJncy5maWxlRXh0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAndHh0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRDcmVhdGVOZXdDb21tYW5kID0gYWRkQ3JlYXRlTmV3Q29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIE5ldyBNYXJrZG93biBGaWxlIGNvbW1hbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDcmVhdGVOZXdNYXJrZG93bkNvbW1hbmQoY29tbWFuZHMsIGJyb3dzZXJGYWN0b3J5LCB0cmFucykge1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY3JlYXRlTmV3TWFya2Rvd24sIHtcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IGFyZ3NbJ2lzUGFsZXR0ZSddXG4gICAgICAgICAgICAgICAgPyB0cmFucy5fXygnTmV3IE1hcmtkb3duIEZpbGUnKVxuICAgICAgICAgICAgICAgIDogdHJhbnMuX18oJ01hcmtkb3duIEZpbGUnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdDcmVhdGUgYSBuZXcgbWFya2Rvd24gZmlsZScpLFxuICAgICAgICAgICAgaWNvbjogYXJncyA9PiAoYXJnc1snaXNQYWxldHRlJ10gPyB1bmRlZmluZWQgOiBtYXJrZG93bkljb24pLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3dkID0gYXJnc1snY3dkJ10gfHwgYnJvd3NlckZhY3RvcnkuZGVmYXVsdEJyb3dzZXIubW9kZWwucGF0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlTmV3KGNvbW1hbmRzLCBjd2QsICdtZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ3JlYXRlTmV3TWFya2Rvd25Db21tYW5kID0gYWRkQ3JlYXRlTmV3TWFya2Rvd25Db21tYW5kO1xuICAgIC8qKlxuICAgICAqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGFkZGluZyB0aGUgZGVmYXVsdCBsYXVuY2hlciBpdGVtcyBmb3IgRmlsZSBFZGl0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRMYXVuY2hlckl0ZW1zKGxhdW5jaGVyLCB0cmFucykge1xuICAgICAgICBhZGRDcmVhdGVOZXdUb0xhdW5jaGVyKGxhdW5jaGVyLCB0cmFucyk7XG4gICAgICAgIGFkZENyZWF0ZU5ld01hcmtkb3duVG9MYXVuY2hlcihsYXVuY2hlciwgdHJhbnMpO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRMYXVuY2hlckl0ZW1zID0gYWRkTGF1bmNoZXJJdGVtcztcbiAgICAvKipcbiAgICAgKiBBZGQgQ3JlYXRlIE5ldyBUZXh0IEZpbGUgdG8gdGhlIExhdW5jaGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ3JlYXRlTmV3VG9MYXVuY2hlcihsYXVuY2hlciwgdHJhbnMpIHtcbiAgICAgICAgbGF1bmNoZXIuYWRkKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuY3JlYXRlTmV3LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRyYW5zLl9fKCdPdGhlcicpLFxuICAgICAgICAgICAgcmFuazogMVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ3JlYXRlTmV3VG9MYXVuY2hlciA9IGFkZENyZWF0ZU5ld1RvTGF1bmNoZXI7XG4gICAgLyoqXG4gICAgICogQWRkIENyZWF0ZSBOZXcgTWFya2Rvd24gdG8gdGhlIExhdW5jaGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ3JlYXRlTmV3TWFya2Rvd25Ub0xhdW5jaGVyKGxhdW5jaGVyLCB0cmFucykge1xuICAgICAgICBsYXVuY2hlci5hZGQoe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVOZXdNYXJrZG93bixcbiAgICAgICAgICAgIGNhdGVnb3J5OiB0cmFucy5fXygnT3RoZXInKSxcbiAgICAgICAgICAgIHJhbms6IDJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENyZWF0ZU5ld01hcmtkb3duVG9MYXVuY2hlciA9IGFkZENyZWF0ZU5ld01hcmtkb3duVG9MYXVuY2hlcjtcbiAgICAvKipcbiAgICAgKiBBZGQgX19fIEZpbGUgaXRlbXMgdG8gdGhlIExhdW5jaGVyIGZvciBjb21tb24gZmlsZSB0eXBlcyBhc3NvY2lhdGVkIHdpdGggYXZhaWxhYmxlIGtlcm5lbHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRLZXJuZWxMYW5ndWFnZUxhdW5jaGVySXRlbXMobGF1bmNoZXIsIHRyYW5zLCBhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZXh0IG9mIGF2YWlsYWJsZUtlcm5lbEZpbGVUeXBlcykge1xuICAgICAgICAgICAgbGF1bmNoZXIuYWRkKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmNyZWF0ZU5ldyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ090aGVyJyksXG4gICAgICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgICAgICBhcmdzOiBleHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZEtlcm5lbExhbmd1YWdlTGF1bmNoZXJJdGVtcyA9IGFkZEtlcm5lbExhbmd1YWdlTGF1bmNoZXJJdGVtcztcbiAgICAvKipcbiAgICAgKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBhZGRpbmcgdGhlIGRlZmF1bHQgaXRlbXMgdG8gdGhlIEZpbGUgRWRpdG9yIHBhbGV0dGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRQYWxldHRlSXRlbXMocGFsZXR0ZSwgdHJhbnMpIHtcbiAgICAgICAgYWRkQ2hhbmdlVGFic0NvbW1hbmRzVG9QYWxldHRlKHBhbGV0dGUsIHRyYW5zKTtcbiAgICAgICAgYWRkQ3JlYXRlTmV3Q29tbWFuZFRvUGFsZXR0ZShwYWxldHRlLCB0cmFucyk7XG4gICAgICAgIGFkZENyZWF0ZU5ld01hcmtkb3duQ29tbWFuZFRvUGFsZXR0ZShwYWxldHRlLCB0cmFucyk7XG4gICAgICAgIGFkZENoYW5nZUZvbnRTaXplQ29tbWFuZHNUb1BhbGV0dGUocGFsZXR0ZSwgdHJhbnMpO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRQYWxldHRlSXRlbXMgPSBhZGRQYWxldHRlSXRlbXM7XG4gICAgLyoqXG4gICAgICogQWRkIGNvbW1hbmRzIHRvIGNoYW5nZSB0aGUgdGFiIGluZGVudGF0aW9uIHRvIHRoZSBGaWxlIEVkaXRvciBwYWxldHRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ2hhbmdlVGFic0NvbW1hbmRzVG9QYWxldHRlKHBhbGV0dGUsIHRyYW5zKSB7XG4gICAgICAgIGNvbnN0IHBhbGV0dGVDYXRlZ29yeSA9IHRyYW5zLl9fKCdUZXh0IEVkaXRvcicpO1xuICAgICAgICBjb25zdCBhcmdzID0ge1xuICAgICAgICAgICAgaW5zZXJ0U3BhY2VzOiBmYWxzZSxcbiAgICAgICAgICAgIHNpemU6IDRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IENvbW1hbmRJRHMuY2hhbmdlVGFicztcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgYXJncywgY2F0ZWdvcnk6IHBhbGV0dGVDYXRlZ29yeSB9KTtcbiAgICAgICAgZm9yIChjb25zdCBzaXplIG9mIFsxLCAyLCA0LCA4XSkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTcGFjZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2l6ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQsIGFyZ3MsIGNhdGVnb3J5OiBwYWxldHRlQ2F0ZWdvcnkgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ2hhbmdlVGFic0NvbW1hbmRzVG9QYWxldHRlID0gYWRkQ2hhbmdlVGFic0NvbW1hbmRzVG9QYWxldHRlO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIENyZWF0ZSBOZXcgRmlsZSBjb21tYW5kIHRvIHRoZSBGaWxlIEVkaXRvciBwYWxldHRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ3JlYXRlTmV3Q29tbWFuZFRvUGFsZXR0ZShwYWxldHRlLCB0cmFucykge1xuICAgICAgICBjb25zdCBwYWxldHRlQ2F0ZWdvcnkgPSB0cmFucy5fXygnVGV4dCBFZGl0b3InKTtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuY3JlYXRlTmV3LFxuICAgICAgICAgICAgYXJnczogeyBpc1BhbGV0dGU6IHRydWUgfSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBwYWxldHRlQ2F0ZWdvcnlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENyZWF0ZU5ld0NvbW1hbmRUb1BhbGV0dGUgPSBhZGRDcmVhdGVOZXdDb21tYW5kVG9QYWxldHRlO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIENyZWF0ZSBOZXcgTWFya2Rvd24gY29tbWFuZCB0byB0aGUgRmlsZSBFZGl0b3IgcGFsZXR0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZENyZWF0ZU5ld01hcmtkb3duQ29tbWFuZFRvUGFsZXR0ZShwYWxldHRlLCB0cmFucykge1xuICAgICAgICBjb25zdCBwYWxldHRlQ2F0ZWdvcnkgPSB0cmFucy5fXygnVGV4dCBFZGl0b3InKTtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuY3JlYXRlTmV3TWFya2Rvd24sXG4gICAgICAgICAgICBhcmdzOiB7IGlzUGFsZXR0ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHBhbGV0dGVDYXRlZ29yeVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkQ3JlYXRlTmV3TWFya2Rvd25Db21tYW5kVG9QYWxldHRlID0gYWRkQ3JlYXRlTmV3TWFya2Rvd25Db21tYW5kVG9QYWxldHRlO1xuICAgIC8qKlxuICAgICAqIEFkZCBjb21tYW5kcyB0byBjaGFuZ2UgdGhlIGZvbnQgc2l6ZSB0byB0aGUgRmlsZSBFZGl0b3IgcGFsZXR0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZENoYW5nZUZvbnRTaXplQ29tbWFuZHNUb1BhbGV0dGUocGFsZXR0ZSwgdHJhbnMpIHtcbiAgICAgICAgY29uc3QgcGFsZXR0ZUNhdGVnb3J5ID0gdHJhbnMuX18oJ1RleHQgRWRpdG9yJyk7XG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBDb21tYW5kSURzLmNoYW5nZUZvbnRTaXplO1xuICAgICAgICBsZXQgYXJncyA9IHsgZGVsdGE6IDEgfTtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgYXJncywgY2F0ZWdvcnk6IHBhbGV0dGVDYXRlZ29yeSB9KTtcbiAgICAgICAgYXJncyA9IHsgZGVsdGE6IC0xIH07XG4gICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQsIGFyZ3MsIGNhdGVnb3J5OiBwYWxldHRlQ2F0ZWdvcnkgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENoYW5nZUZvbnRTaXplQ29tbWFuZHNUb1BhbGV0dGUgPSBhZGRDaGFuZ2VGb250U2l6ZUNvbW1hbmRzVG9QYWxldHRlO1xuICAgIC8qKlxuICAgICAqIEFkZCBOZXcgX19fIEZpbGUgY29tbWFuZHMgdG8gdGhlIEZpbGUgRWRpdG9yIHBhbGV0dGUgZm9yIGNvbW1vbiBmaWxlIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBhdmFpbGFibGUga2VybmVsc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZEtlcm5lbExhbmd1YWdlUGFsZXR0ZUl0ZW1zKHBhbGV0dGUsIHRyYW5zLCBhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMpIHtcbiAgICAgICAgY29uc3QgcGFsZXR0ZUNhdGVnb3J5ID0gdHJhbnMuX18oJ1RleHQgRWRpdG9yJyk7XG4gICAgICAgIGZvciAobGV0IGV4dCBvZiBhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVOZXcsXG4gICAgICAgICAgICAgICAgYXJnczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBleHQpLCB7IGlzUGFsZXR0ZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogcGFsZXR0ZUNhdGVnb3J5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb21tYW5kcy5hZGRLZXJuZWxMYW5ndWFnZVBhbGV0dGVJdGVtcyA9IGFkZEtlcm5lbExhbmd1YWdlUGFsZXR0ZUl0ZW1zO1xuICAgIC8qKlxuICAgICAqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGFkZGluZyB0aGUgZGVmYXVsdCBtZW51IGl0ZW1zIGZvciBGaWxlIEVkaXRvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZE1lbnVJdGVtcyhtZW51LCBjb21tYW5kcywgdHJhY2tlciwgdHJhbnMsIGNvbnNvbGVUcmFja2VyLCBzZXNzaW9uRGlhbG9ncykge1xuICAgICAgICAvLyBBZGQgdW5kby9yZWRvIGhvb2tzIHRvIHRoZSBlZGl0IG1lbnUuXG4gICAgICAgIGFkZFVuZG9SZWRvVG9FZGl0TWVudShtZW51LCB0cmFja2VyKTtcbiAgICAgICAgLy8gQWRkIGVkaXRvciB2aWV3IG9wdGlvbnMuXG4gICAgICAgIGFkZEVkaXRvclZpZXdlclRvVmlld01lbnUobWVudSwgdHJhY2tlcik7XG4gICAgICAgIC8vIEFkZCBhIGNvbnNvbGUgY3JlYXRvciB0aGUgdGhlIGZpbGUgbWVudS5cbiAgICAgICAgYWRkQ29uc29sZUNyZWF0b3JUb0ZpbGVNZW51KG1lbnUsIGNvbW1hbmRzLCB0cmFja2VyLCB0cmFucyk7XG4gICAgICAgIC8vIEFkZCBhIGNvZGUgcnVubmVyIHRvIHRoZSBydW4gbWVudS5cbiAgICAgICAgaWYgKGNvbnNvbGVUcmFja2VyKSB7XG4gICAgICAgICAgICBhZGRDb2RlUnVubmVyc1RvUnVuTWVudShtZW51LCBjb21tYW5kcywgdHJhY2tlciwgY29uc29sZVRyYWNrZXIsIHRyYW5zLCBzZXNzaW9uRGlhbG9ncyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29tbWFuZHMuYWRkTWVudUl0ZW1zID0gYWRkTWVudUl0ZW1zO1xuICAgIC8qKlxuICAgICAqIEFkZCBDcmVhdGUgTmV3IF9fXyBGaWxlIGNvbW1hbmRzIHRvIHRoZSBGaWxlIG1lbnUgZm9yIGNvbW1vbiBmaWxlIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBhdmFpbGFibGUga2VybmVsc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZEtlcm5lbExhbmd1YWdlTWVudUl0ZW1zKG1lbnUsIGF2YWlsYWJsZUtlcm5lbEZpbGVUeXBlcykge1xuICAgICAgICBmb3IgKGxldCBleHQgb2YgYXZhaWxhYmxlS2VybmVsRmlsZVR5cGVzKSB7XG4gICAgICAgICAgICBtZW51LmZpbGVNZW51Lm5ld01lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVOZXcsXG4gICAgICAgICAgICAgICAgYXJnczogZXh0LFxuICAgICAgICAgICAgICAgIHJhbms6IDMxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb21tYW5kcy5hZGRLZXJuZWxMYW5ndWFnZU1lbnVJdGVtcyA9IGFkZEtlcm5lbExhbmd1YWdlTWVudUl0ZW1zO1xuICAgIC8qKlxuICAgICAqIEFkZCBGaWxlIEVkaXRvciB1bmRvIGFuZCByZWRvIHdpZGdldHMgdG8gdGhlIEVkaXQgbWVudVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFVuZG9SZWRvVG9FZGl0TWVudShtZW51LCB0cmFja2VyKSB7XG4gICAgICAgIG1lbnUuZWRpdE1lbnUudW5kb2Vycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIHVuZG86IHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNvbnRlbnQuZWRpdG9yLnVuZG8oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWRvOiB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb250ZW50LmVkaXRvci5yZWRvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRVbmRvUmVkb1RvRWRpdE1lbnUgPSBhZGRVbmRvUmVkb1RvRWRpdE1lbnU7XG4gICAgLyoqXG4gICAgICogQWRkIGEgRmlsZSBFZGl0b3IgZWRpdG9yIHZpZXdlciB0byB0aGUgVmlldyBNZW51XG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkRWRpdG9yVmlld2VyVG9WaWV3TWVudShtZW51LCB0cmFja2VyKSB7XG4gICAgICAgIG1lbnUudmlld01lbnUuZWRpdG9yVmlld2Vycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIHRvZ2dsZUxpbmVOdW1iZXJzOiB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVOdW1iZXJzID0gIXdpZGdldC5jb250ZW50LmVkaXRvci5nZXRPcHRpb24oJ2xpbmVOdW1iZXJzJyk7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNvbnRlbnQuZWRpdG9yLnNldE9wdGlvbignbGluZU51bWJlcnMnLCBsaW5lTnVtYmVycyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlV29yZFdyYXA6IHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB3aWRnZXQuY29udGVudC5lZGl0b3IuZ2V0T3B0aW9uKCdsaW5lV3JhcCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gb2xkVmFsdWUgPT09ICdvZmYnID8gJ29uJyA6ICdvZmYnO1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb250ZW50LmVkaXRvci5zZXRPcHRpb24oJ2xpbmVXcmFwJywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZU1hdGNoQnJhY2tldHM6IHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hCcmFja2V0cyA9ICF3aWRnZXQuY29udGVudC5lZGl0b3IuZ2V0T3B0aW9uKCdtYXRjaEJyYWNrZXRzJyk7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNvbnRlbnQuZWRpdG9yLnNldE9wdGlvbignbWF0Y2hCcmFja2V0cycsIG1hdGNoQnJhY2tldHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVOdW1iZXJzVG9nZ2xlZDogd2lkZ2V0ID0+IHdpZGdldC5jb250ZW50LmVkaXRvci5nZXRPcHRpb24oJ2xpbmVOdW1iZXJzJyksXG4gICAgICAgICAgICB3b3JkV3JhcFRvZ2dsZWQ6IHdpZGdldCA9PiB3aWRnZXQuY29udGVudC5lZGl0b3IuZ2V0T3B0aW9uKCdsaW5lV3JhcCcpICE9PSAnb2ZmJyxcbiAgICAgICAgICAgIG1hdGNoQnJhY2tldHNUb2dnbGVkOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRlbnQuZWRpdG9yLmdldE9wdGlvbignbWF0Y2hCcmFja2V0cycpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb21tYW5kcy5hZGRFZGl0b3JWaWV3ZXJUb1ZpZXdNZW51ID0gYWRkRWRpdG9yVmlld2VyVG9WaWV3TWVudTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBGaWxlIEVkaXRvciBjb25zb2xlIGNyZWF0b3IgdG8gdGhlIEZpbGUgbWVudVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZENvbnNvbGVDcmVhdG9yVG9GaWxlTWVudShtZW51LCBjb21tYW5kcywgdHJhY2tlciwgdHJhbnMpIHtcbiAgICAgICAgY29uc3QgY3JlYXRlQ29uc29sZSA9IGdldENyZWF0ZUNvbnNvbGVGdW5jdGlvbihjb21tYW5kcyk7XG4gICAgICAgIG1lbnUuZmlsZU1lbnUuY29uc29sZUNyZWF0b3JzLmFkZCh7XG4gICAgICAgICAgICB0cmFja2VyLFxuICAgICAgICAgICAgY3JlYXRlQ29uc29sZUxhYmVsOiAobikgPT4gdHJhbnMuX18oJ0NyZWF0ZSBDb25zb2xlIGZvciBFZGl0b3InKSxcbiAgICAgICAgICAgIGNyZWF0ZUNvbnNvbGVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENvbnNvbGVDcmVhdG9yVG9GaWxlTWVudSA9IGFkZENvbnNvbGVDcmVhdG9yVG9GaWxlTWVudTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBGaWxlIEVkaXRvciBjb2RlIHJ1bm5lciB0byB0aGUgUnVuIG1lbnVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRDb2RlUnVubmVyc1RvUnVuTWVudShtZW51LCBjb21tYW5kcywgdHJhY2tlciwgY29uc29sZVRyYWNrZXIsIHRyYW5zLCBzZXNzaW9uRGlhbG9ncykge1xuICAgICAgICBtZW51LnJ1bk1lbnUuY29kZVJ1bm5lcnMuYWRkKHtcbiAgICAgICAgICAgIHRyYWNrZXIsXG4gICAgICAgICAgICBydW5MYWJlbDogKG4pID0+IHRyYW5zLl9fKCdSdW4gQ29kZScpLFxuICAgICAgICAgICAgcnVuQWxsTGFiZWw6IChuKSA9PiB0cmFucy5fXygnUnVuIEFsbCBDb2RlJyksXG4gICAgICAgICAgICByZXN0YXJ0QW5kUnVuQWxsTGFiZWw6IChuKSA9PiB0cmFucy5fXygnUmVzdGFydCBLZXJuZWwgYW5kIFJ1biBBbGwgQ29kZScpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiBjdXJyZW50ID0+ICEhY29uc29sZVRyYWNrZXIuZmluZCh3aWRnZXQgPT4geyB2YXIgX2E7IHJldHVybiAoKF9hID0gd2lkZ2V0LnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXRoKSA9PT0gY3VycmVudC5jb250ZXh0LnBhdGg7IH0pLFxuICAgICAgICAgICAgcnVuOiAoKSA9PiBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMucnVuQ29kZSksXG4gICAgICAgICAgICBydW5BbGw6ICgpID0+IGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5ydW5BbGxDb2RlKSxcbiAgICAgICAgICAgIHJlc3RhcnRBbmRSdW5BbGw6IGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGNvbnNvbGVUcmFja2VyLmZpbmQod2lkZ2V0ID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IHdpZGdldC5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF0aCkgPT09IGN1cnJlbnQuY29udGV4dC5wYXRoOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoc2Vzc2lvbkRpYWxvZ3MgfHwgc2Vzc2lvbkNvbnRleHREaWFsb2dzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlc3RhcnQod2lkZ2V0LnNlc3Npb25Db250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdGFydGVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5ydW5BbGxDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXJ0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbW1hbmRzLmFkZENvZGVSdW5uZXJzVG9SdW5NZW51ID0gYWRkQ29kZVJ1bm5lcnNUb1J1bk1lbnU7XG59KShDb21tYW5kcyB8fCAoQ29tbWFuZHMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbWFuZHMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZmlsZWVkaXRvci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlVG9vbGJhckZhY3RvcnksIElDb21tYW5kUGFsZXR0ZSwgSVNlc3Npb25Db250ZXh0RGlhbG9ncywgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSwgV2lkZ2V0VHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVFZGl0b3IsIElFZGl0b3JTZXJ2aWNlcyB9IGZyb20gJ0BqdXB5dGVybGFiL2NvZGVlZGl0b3InO1xuaW1wb3J0IHsgSUNvbnNvbGVUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29uc29sZSc7XG5pbXBvcnQgeyBJRmlsZUJyb3dzZXJGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXInO1xuaW1wb3J0IHsgRmlsZUVkaXRvckZhY3RvcnksIElFZGl0b3JUcmFja2VyLCBUYWJTcGFjZVN0YXR1cyB9IGZyb20gJ0BqdXB5dGVybGFiL2ZpbGVlZGl0b3InO1xuaW1wb3J0IHsgSUxhdW5jaGVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbGF1bmNoZXInO1xuaW1wb3J0IHsgSU1haW5NZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbWFpbm1lbnUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJU3RhdHVzQmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBDb21tYW5kcywgRkFDVE9SWSB9IGZyb20gJy4vY29tbWFuZHMnO1xuZXhwb3J0IHsgQ29tbWFuZHMgfSBmcm9tICcuL2NvbW1hbmRzJztcbi8qKlxuICogVGhlIGVkaXRvciB0cmFja2VyIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgcGx1Z2luID0ge1xuICAgIGFjdGl2YXRlLFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWVkaXRvci1leHRlbnNpb246cGx1Z2luJyxcbiAgICByZXF1aXJlczogW1xuICAgICAgICBJRWRpdG9yU2VydmljZXMsXG4gICAgICAgIElGaWxlQnJvd3NlckZhY3RvcnksXG4gICAgICAgIElTZXR0aW5nUmVnaXN0cnksXG4gICAgICAgIElUcmFuc2xhdG9yXG4gICAgXSxcbiAgICBvcHRpb25hbDogW1xuICAgICAgICBJQ29uc29sZVRyYWNrZXIsXG4gICAgICAgIElDb21tYW5kUGFsZXR0ZSxcbiAgICAgICAgSUxhdW5jaGVyLFxuICAgICAgICBJTWFpbk1lbnUsXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSVNlc3Npb25Db250ZXh0RGlhbG9ncyxcbiAgICAgICAgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeVxuICAgIF0sXG4gICAgcHJvdmlkZXM6IElFZGl0b3JUcmFja2VyLFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogQSBwbHVnaW4gdGhhdCBwcm92aWRlcyBhIHN0YXR1cyBpdGVtIGFsbG93aW5nIHRoZSB1c2VyIHRvXG4gKiBzd2l0Y2ggdGFicyB2cyBzcGFjZXMgYW5kIHRhYiB3aWR0aHMgZm9yIHRleHQgZWRpdG9ycy5cbiAqL1xuZXhwb3J0IGNvbnN0IHRhYlNwYWNlU3RhdHVzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWVkaXRvci1leHRlbnNpb246dGFiLXNwYWNlLXN0YXR1cycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSUVkaXRvclRyYWNrZXIsIElTZXR0aW5nUmVnaXN0cnksIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lTdGF0dXNCYXJdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBlZGl0b3JUcmFja2VyLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zbGF0b3IsIHN0YXR1c0JhcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBpZiAoIXN0YXR1c0Jhcikge1xuICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBkaXNhYmxlIGlmIHN0YXR1c2JhciBtaXNzaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIGEgbWVudSBmb3Igc3dpdGNoaW5nIHRhYnMgdnMgc3BhY2VzLlxuICAgICAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoeyBjb21tYW5kczogYXBwLmNvbW1hbmRzIH0pO1xuICAgICAgICBjb25zdCBjb21tYW5kID0gJ2ZpbGVlZGl0b3I6Y2hhbmdlLXRhYnMnO1xuICAgICAgICBjb25zdCB7IHNoZWxsIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7XG4gICAgICAgICAgICBpbnNlcnRTcGFjZXM6IGZhbHNlLFxuICAgICAgICAgICAgc2l6ZTogNCxcbiAgICAgICAgICAgIG5hbWU6IHRyYW5zLl9fKCdJbmRlbnQgd2l0aCBUYWInKVxuICAgICAgICB9O1xuICAgICAgICBtZW51LmFkZEl0ZW0oeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IHNpemUgb2YgWzEsIDIsIDQsIDhdKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0ge1xuICAgICAgICAgICAgICAgIGluc2VydFNwYWNlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRyYW5zLl9uKCdTcGFjZXM6ICUxJywgJ1NwYWNlczogJTEnLCBzaXplKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1lbnUuYWRkSXRlbSh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBzdGF0dXMgaXRlbS5cbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBUYWJTcGFjZVN0YXR1cyh7IG1lbnUsIHRyYW5zbGF0b3IgfSk7XG4gICAgICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGNvZGUgZWRpdG9yIGNvbmZpZyBmcm9tIHRoZSBzZXR0aW5ncyBzeXN0ZW0uXG4gICAgICAgIGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgICAgICAgICBpdGVtLm1vZGVsLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0Q29uZmlnKSwgc2V0dGluZ3MuZ2V0KCdlZGl0b3JDb25maWcnKS5jb21wb3NpdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2b2lkIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHNldHRpbmdSZWdpc3RyeS5sb2FkKCdAanVweXRlcmxhYi9maWxlZWRpdG9yLWV4dGVuc2lvbjpwbHVnaW4nKSxcbiAgICAgICAgICAgIGFwcC5yZXN0b3JlZFxuICAgICAgICBdKS50aGVuKChbc2V0dGluZ3NdKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QodXBkYXRlU2V0dGluZ3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIHRoZSBzdGF0dXMgaXRlbS5cbiAgICAgICAgc3RhdHVzQmFyLnJlZ2lzdGVyU3RhdHVzSXRlbSgnQGp1cHl0ZXJsYWIvZmlsZWVkaXRvci1leHRlbnNpb246dGFiLXNwYWNlLXN0YXR1cycsIHtcbiAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBpc0FjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoISFzaGVsbC5jdXJyZW50V2lkZ2V0ICYmIGVkaXRvclRyYWNrZXIuaGFzKHNoZWxsLmN1cnJlbnRXaWRnZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbcGx1Z2luLCB0YWJTcGFjZVN0YXR1c107XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgZWRpdG9yIHRyYWNrZXIgcGx1Z2luLlxuICovXG5mdW5jdGlvbiBhY3RpdmF0ZShhcHAsIGVkaXRvclNlcnZpY2VzLCBicm93c2VyRmFjdG9yeSwgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFuc2xhdG9yLCBjb25zb2xlVHJhY2tlciwgcGFsZXR0ZSwgbGF1bmNoZXIsIG1lbnUsIHJlc3RvcmVyLCBzZXNzaW9uRGlhbG9ncywgdG9vbGJhclJlZ2lzdHJ5KSB7XG4gICAgY29uc3QgaWQgPSBwbHVnaW4uaWQ7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSAnZWRpdG9yJztcbiAgICBsZXQgdG9vbGJhckZhY3Rvcnk7XG4gICAgaWYgKHRvb2xiYXJSZWdpc3RyeSkge1xuICAgICAgICB0b29sYmFyRmFjdG9yeSA9IGNyZWF0ZVRvb2xiYXJGYWN0b3J5KHRvb2xiYXJSZWdpc3RyeSwgc2V0dGluZ1JlZ2lzdHJ5LCBGQUNUT1JZLCBpZCwgdHJhbnNsYXRvcik7XG4gICAgfVxuICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgRmlsZUVkaXRvckZhY3Rvcnkoe1xuICAgICAgICBlZGl0b3JTZXJ2aWNlcyxcbiAgICAgICAgZmFjdG9yeU9wdGlvbnM6IHtcbiAgICAgICAgICAgIG5hbWU6IEZBQ1RPUlksXG4gICAgICAgICAgICBmaWxlVHlwZXM6IFsnbWFya2Rvd24nLCAnKiddLFxuICAgICAgICAgICAgZGVmYXVsdEZvcjogWydtYXJrZG93bicsICcqJ10sXG4gICAgICAgICAgICB0b29sYmFyRmFjdG9yeSxcbiAgICAgICAgICAgIHRyYW5zbGF0b3JcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHsgY29tbWFuZHMsIHJlc3RvcmVkLCBzaGVsbCB9ID0gYXBwO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZVxuICAgIH0pO1xuICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IHRyYWNrZXIuY3VycmVudFdpZGdldCAhPT0gbnVsbCAmJlxuICAgICAgICB0cmFja2VyLmN1cnJlbnRXaWRnZXQgPT09IHNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgY29uc3QgY29tbW9uTGFuZ3VhZ2VGaWxlVHlwZURhdGEgPSBuZXcgTWFwKFtcbiAgICAgICAgW1xuICAgICAgICAgICAgJ3B5dGhvbicsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRXh0OiAncHknLFxuICAgICAgICAgICAgICAgICAgICBpY29uTmFtZTogJ3VpLWNvbXBvbmVudHM6cHl0aG9uJyxcbiAgICAgICAgICAgICAgICAgICAgbGF1bmNoZXJMYWJlbDogdHJhbnMuX18oJ1B5dGhvbiBGaWxlJyksXG4gICAgICAgICAgICAgICAgICAgIHBhbGV0dGVMYWJlbDogdHJhbnMuX18oJ05ldyBQeXRob24gRmlsZScpLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQ3JlYXRlIGEgbmV3IFB5dGhvbiBmaWxlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdqdWxpYScsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRXh0OiAnamwnLFxuICAgICAgICAgICAgICAgICAgICBpY29uTmFtZTogJ3VpLWNvbXBvbmVudHM6anVsaWEnLFxuICAgICAgICAgICAgICAgICAgICBsYXVuY2hlckxhYmVsOiB0cmFucy5fXygnSnVsaWEgRmlsZScpLFxuICAgICAgICAgICAgICAgICAgICBwYWxldHRlTGFiZWw6IHRyYW5zLl9fKCdOZXcgSnVsaWEgRmlsZScpLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQ3JlYXRlIGEgbmV3IEp1bGlhIGZpbGUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1InLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUV4dDogJ3InLFxuICAgICAgICAgICAgICAgICAgICBpY29uTmFtZTogJ3VpLWNvbXBvbmVudHM6ci1rZXJuZWwnLFxuICAgICAgICAgICAgICAgICAgICBsYXVuY2hlckxhYmVsOiB0cmFucy5fXygnUiBGaWxlJyksXG4gICAgICAgICAgICAgICAgICAgIHBhbGV0dGVMYWJlbDogdHJhbnMuX18oJ05ldyBSIEZpbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0NyZWF0ZSBhIG5ldyBSIGZpbGUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgIF0pO1xuICAgIC8vIFVzZSBhdmFpbGFibGUga2VybmVscyB0byBkZXRlcm1pbmUgd2hpY2ggY29tbW9uIGZpbGUgdHlwZXMgc2hvdWxkIGhhdmUgJ0NyZWF0ZSBOZXcnIG9wdGlvbnMgaW4gdGhlIExhdW5jaGVyLCBGaWxlIEVkaXRvciBwYWxldHRlLCBhbmQgRmlsZSBtZW51XG4gICAgY29uc3QgZ2V0QXZhaWxhYmxlS2VybmVsRmlsZVR5cGVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBzcGVjc01hbmFnZXIgPSBhcHAuc2VydmljZU1hbmFnZXIua2VybmVsc3BlY3M7XG4gICAgICAgIGF3YWl0IHNwZWNzTWFuYWdlci5yZWFkeTtcbiAgICAgICAgbGV0IGZpbGVUeXBlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgY29uc3Qgc3BlY3MgPSAoX2IgPSAoX2EgPSBzcGVjc01hbmFnZXIuc3BlY3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWxzcGVjcykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge307XG4gICAgICAgIE9iamVjdC5rZXlzKHNwZWNzKS5mb3JFYWNoKHNwZWMgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3BlY01vZGVsID0gc3BlY3Nbc3BlY107XG4gICAgICAgICAgICBpZiAoc3BlY01vZGVsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0cyA9IGNvbW1vbkxhbmd1YWdlRmlsZVR5cGVEYXRhLmdldChzcGVjTW9kZWwubGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIGV4dHMgPT09IG51bGwgfHwgZXh0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXh0cy5mb3JFYWNoKGV4dCA9PiBmaWxlVHlwZXMuYWRkKGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlcztcbiAgICB9O1xuICAgIC8vIEhhbmRsZSBzdGF0ZSByZXN0b3JhdGlvbi5cbiAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKHRyYWNrZXIsIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdkb2NtYW5hZ2VyOm9wZW4nLFxuICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+ICh7IHBhdGg6IHdpZGdldC5jb250ZXh0LnBhdGgsIGZhY3Rvcnk6IEZBQ1RPUlkgfSksXG4gICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRleHQucGF0aFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQWRkIGEgY29uc29sZSBjcmVhdG9yIHRvIHRoZSBGaWxlIG1lbnVcbiAgICAvLyBGZXRjaCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgc2V0dGluZ3MuXG4gICAgUHJvbWlzZS5hbGwoW3NldHRpbmdSZWdpc3RyeS5sb2FkKGlkKSwgcmVzdG9yZWRdKVxuICAgICAgICAudGhlbigoW3NldHRpbmdzXSkgPT4ge1xuICAgICAgICBDb21tYW5kcy51cGRhdGVTZXR0aW5ncyhzZXR0aW5ncywgY29tbWFuZHMpO1xuICAgICAgICBDb21tYW5kcy51cGRhdGVUcmFja2VyKHRyYWNrZXIpO1xuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgQ29tbWFuZHMudXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MsIGNvbW1hbmRzKTtcbiAgICAgICAgICAgIENvbW1hbmRzLnVwZGF0ZVRyYWNrZXIodHJhY2tlcik7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICBDb21tYW5kcy51cGRhdGVUcmFja2VyKHRyYWNrZXIpO1xuICAgIH0pO1xuICAgIGZhY3Rvcnkud2lkZ2V0Q3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICAvLyBOb3RpZnkgdGhlIHdpZGdldCB0cmFja2VyIGlmIHJlc3RvcmUgZGF0YSBuZWVkcyB0byB1cGRhdGUuXG4gICAgICAgIHdpZGdldC5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdm9pZCB0cmFja2VyLnNhdmUod2lkZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZvaWQgdHJhY2tlci5hZGQod2lkZ2V0KTtcbiAgICAgICAgQ29tbWFuZHMudXBkYXRlV2lkZ2V0KHdpZGdldC5jb250ZW50KTtcbiAgICB9KTtcbiAgICBhcHAuZG9jUmVnaXN0cnkuYWRkV2lkZ2V0RmFjdG9yeShmYWN0b3J5KTtcbiAgICAvLyBIYW5kbGUgdGhlIHNldHRpbmdzIG9mIG5ldyB3aWRnZXRzLlxuICAgIHRyYWNrZXIud2lkZ2V0QWRkZWQuY29ubmVjdCgoc2VuZGVyLCB3aWRnZXQpID0+IHtcbiAgICAgICAgQ29tbWFuZHMudXBkYXRlV2lkZ2V0KHdpZGdldC5jb250ZW50KTtcbiAgICB9KTtcbiAgICBDb21tYW5kcy5hZGRDb21tYW5kcyhjb21tYW5kcywgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFucywgaWQsIGlzRW5hYmxlZCwgdHJhY2tlciwgYnJvd3NlckZhY3RvcnkpO1xuICAgIC8vIEFkZCBhIGxhdW5jaGVyIGl0ZW0gaWYgdGhlIGxhdW5jaGVyIGlzIGF2YWlsYWJsZS5cbiAgICBpZiAobGF1bmNoZXIpIHtcbiAgICAgICAgQ29tbWFuZHMuYWRkTGF1bmNoZXJJdGVtcyhsYXVuY2hlciwgdHJhbnMpO1xuICAgIH1cbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICBDb21tYW5kcy5hZGRQYWxldHRlSXRlbXMocGFsZXR0ZSwgdHJhbnMpO1xuICAgIH1cbiAgICBpZiAobWVudSkge1xuICAgICAgICBDb21tYW5kcy5hZGRNZW51SXRlbXMobWVudSwgY29tbWFuZHMsIHRyYWNrZXIsIHRyYW5zLCBjb25zb2xlVHJhY2tlciwgc2Vzc2lvbkRpYWxvZ3MpO1xuICAgIH1cbiAgICBnZXRBdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMoKVxuICAgICAgICAudGhlbihhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMgPT4ge1xuICAgICAgICBpZiAobGF1bmNoZXIpIHtcbiAgICAgICAgICAgIENvbW1hbmRzLmFkZEtlcm5lbExhbmd1YWdlTGF1bmNoZXJJdGVtcyhsYXVuY2hlciwgdHJhbnMsIGF2YWlsYWJsZUtlcm5lbEZpbGVUeXBlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIENvbW1hbmRzLmFkZEtlcm5lbExhbmd1YWdlUGFsZXR0ZUl0ZW1zKHBhbGV0dGUsIHRyYW5zLCBhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZW51KSB7XG4gICAgICAgICAgICBDb21tYW5kcy5hZGRLZXJuZWxMYW5ndWFnZU1lbnVJdGVtcyhtZW51LCBhdmFpbGFibGVLZXJuZWxGaWxlVHlwZXMpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZWFzb24ubWVzc2FnZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyYWNrZXI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9