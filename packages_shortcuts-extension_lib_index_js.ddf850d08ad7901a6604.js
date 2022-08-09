(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_shortcuts-extension_lib_index_js"],{

/***/ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutInputStyle.js":
/*!***********************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/ShortcutInputStyle.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputBoxStyle": () => (/* binding */ InputBoxStyle),
/* harmony export */   "InputBoxNewStyle": () => (/* binding */ InputBoxNewStyle),
/* harmony export */   "InputBoxHiddenStyle": () => (/* binding */ InputBoxHiddenStyle),
/* harmony export */   "InputStyle": () => (/* binding */ InputStyle),
/* harmony export */   "InputUnavailableStyle": () => (/* binding */ InputUnavailableStyle),
/* harmony export */   "InputTextStyle": () => (/* binding */ InputTextStyle),
/* harmony export */   "InputSelectedTextStyle": () => (/* binding */ InputSelectedTextStyle),
/* harmony export */   "InputWaitingStyle": () => (/* binding */ InputWaitingStyle),
/* harmony export */   "SubmitStyle": () => (/* binding */ SubmitStyle),
/* harmony export */   "SubmitNonFunctionalStyle": () => (/* binding */ SubmitNonFunctionalStyle),
/* harmony export */   "SubmitConflictStyle": () => (/* binding */ SubmitConflictStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const InputBoxStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'inline-flex',
    paddingTop: '2px'
});
const InputBoxNewStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginLeft: '10px'
});
const InputBoxHiddenStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'hidden'
});
const slideAnimation = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
    from: {
        width: '0',
        left: '0'
    },
    to: {
        width: '120px',
        left: '0'
    }
});
const InputStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    animationDuration: '0.5s',
    animationTimingFunction: 'ease-out',
    animationName: slideAnimation,
    borderWidth: 'var(--jp-border-width)',
    borderColor: 'var(--jp-border-color3)',
    borderStyle: 'solid',
    backgroundColor: 'var(--jp-layout-color0)',
    marginLeft: 'auto',
    paddingLeft: '10px',
    width: '120px',
    height: '25px',
    lineHeight: '25px',
    display: 'block',
    $nest: {
        '&:focus': {
            outline: 'none',
            color: 'var(--jp-content-font-color1)',
            borderColor: 'var(--jp-brand-color2)'
        }
    }
});
const InputUnavailableStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '&:focus': {
            borderColor: 'var(--jp-error-color2)'
        }
    }
});
const InputTextStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    overflowX: 'hidden',
    overflowY: 'hidden',
    margin: '0',
    marginTop: '4px',
    padding: '0 5px',
    height: '17px',
    lineHeight: '17px',
    width: 'fit-content'
});
const InputSelectedTextStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-brand-color3)',
    overflow: 'hidden'
});
const InputWaitingStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-content-font-color3)'
});
const SubmitStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: 'var(--jp-brand-color1)',
    borderRadius: '0px',
    border: 'none',
    color: 'var(--jp-layout-color0)',
    fontFamily: 'var(--jp-ui-font-family)',
    display: 'block',
    height: '27px',
    backgroundImage: 'var( --jp-icon-checkmark-white )',
    backgroundRepeat: 'no-repeat',
    width: '26px',
    $nest: {
        '&:focus': {
            outline: 'none'
        }
    }
});
const SubmitNonFunctionalStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundImage: 'var( --jp-icon-checkmark-white )',
    background: 'var(--jp-layout-color3)'
});
const SubmitConflictStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: 'var(--jp-error-color1)',
    backgroundImage: 'var(--jp-icon-error-white )',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px',
    backgroundPositionX: '2px',
    backgroundPositionY: '2px',
    border: 'none'
});
//# sourceMappingURL=ShortcutInputStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutItemStyle.js":
/*!**********************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/ShortcutItemStyle.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellStyle": () => (/* binding */ CellStyle),
/* harmony export */   "ShortcutCellStyle": () => (/* binding */ ShortcutCellStyle),
/* harmony export */   "EmptyShortcutCellStyle": () => (/* binding */ EmptyShortcutCellStyle),
/* harmony export */   "SingleShortcutCellStyle": () => (/* binding */ SingleShortcutCellStyle),
/* harmony export */   "RowStyle": () => (/* binding */ RowStyle),
/* harmony export */   "ConflictContainerStyle": () => (/* binding */ ConflictContainerStyle),
/* harmony export */   "ErrorMessageStyle": () => (/* binding */ ErrorMessageStyle),
/* harmony export */   "ErrorButtonStyle": () => (/* binding */ ErrorButtonStyle),
/* harmony export */   "ShortcutContainerStyle": () => (/* binding */ ShortcutContainerStyle),
/* harmony export */   "ShortcutKeysContainerStyle": () => (/* binding */ ShortcutKeysContainerStyle),
/* harmony export */   "ShortcutKeysStyle": () => (/* binding */ ShortcutKeysStyle),
/* harmony export */   "OrStyle": () => (/* binding */ OrStyle),
/* harmony export */   "OrTwoStyle": () => (/* binding */ OrTwoStyle),
/* harmony export */   "CommaStyle": () => (/* binding */ CommaStyle),
/* harmony export */   "PlusStyle": () => (/* binding */ PlusStyle),
/* harmony export */   "ResetStyle": () => (/* binding */ ResetStyle),
/* harmony export */   "SourceCellStyle": () => (/* binding */ SourceCellStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const CellStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '6px 12px',
    display: 'table-cell',
    width: '20%',
    verticalAlign: 'middle'
});
const ShortcutCellStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    minWidth: '100px',
    flexWrap: 'wrap'
});
const EmptyShortcutCellStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: '32px',
    $nest: {
        '& #add-link': {}
    }
});
const SingleShortcutCellStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({});
const RowStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '10px',
    width: '100%',
    display: 'table-row',
    borderBottom: 'solid',
    borderBottomColor: 'var(--jp-border-color1)',
    borderBottomWidth: 'var(--jp-border-width)',
    verticalAlign: 'middle',
    backgroundColor: 'var(--jp-layout-color0)',
    $nest: {
        '&:hover #shortcut-keys': {
            borderColor: 'var(--jp-border-color1)',
            background: 'var(--jp-layout-color2)'
        },
        '&:hover #add-link': {
            display: 'block'
        },
        '&:hover #or': {
            display: 'block'
        }
    }
});
function getMarginLeft(showSelectors, errorSize) {
    if (errorSize === 0 /* Regular */) {
        return showSelectors ? '20%' : '25%';
    }
    else {
        return '0';
    }
}
function ConflictContainerStyle(showSelectors, errorSize) {
    return (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
        display: 'flex',
        flexWrap: 'wrap',
        padding: '6px 12px',
        marginLeft: getMarginLeft(showSelectors, errorSize)
    });
}
const ErrorMessageStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-error-color1)',
    marginTop: '9px'
});
const ErrorButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    lineHeight: '34px',
    marginLeft: '10px',
    $nest: {
        '& button:nth-of-type(1)': {
            height: '25px',
            marginRight: '5px',
            backgroundColor: 'var(--jp-border-color0)',
            color: 'white',
            outline: 'none',
            $nest: {
                '&:hover': {},
                '&:active': {
                    outline: 'none',
                    border: 'none'
                },
                '&focus': {
                    outline: 'none',
                    border: 'none'
                }
            }
        },
        '& button:nth-of-type(2)': {
            height: '25px',
            backgroundColor: 'var(--jp-error-color1)',
            color: 'white',
            outline: 'none',
            $nest: {
                '&:hover': {},
                '&:active': {
                    outline: 'none',
                    border: 'none'
                },
                '&focus': {
                    outline: 'none',
                    border: 'none'
                }
            }
        }
    }
});
const ShortcutContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexWrap: 'wrap',
    $nest: {
        '&:hover #shortcut-keys': {
            borderColor: 'var(--jp-border-color3)',
            background: 'var(--jp-layout-color3)'
        }
    }
});
const ShortcutKeysContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-code-font-size)',
    fontFamily: 'var(--jp-ui-font-family)',
    display: 'flex'
});
const ShortcutKeysStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    borderWidth: 'var(--jp-border-width)',
    borderColor: 'var(--jp-layout-color0)',
    background: 'var(--jp-layout-color0)',
    padding: '5px 6px',
    borderRadius: 'var(--jp-border-radius)',
    margin: '3px 0'
});
const OrStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginRight: '12px',
    marginLeft: '12px',
    marginTop: '8px',
    color: 'var(--jp-content-font-color3)',
    display: 'none',
    $nest: {
        '&:hover': {
            display: 'block'
        }
    }
});
const OrTwoStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginRight: '12px',
    marginLeft: '12px',
    marginTop: '8px',
    color: 'var(--jp-content-font-color3)',
    display: 'block'
});
const CommaStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '10px',
    marginRight: '2px',
    marginLeft: '2px'
});
const PlusStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'none',
    background: 'var(--jp-brand-color3)',
    borderColor: 'var(--jp-layout-color0)',
    borderRadius: 'var(--jp-border-radius)',
    borderWidth: 'var(--jp-border-width)',
    margin: '3px 0',
    padding: '5px 6px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-brand-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-brand-color2)'
        }
    }
});
const ResetStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-brand-color2)',
    paddingLeft: '10px',
    $nest: {
        '&:hover': {
            color: 'var(--jp-brand-color1)'
        }
    }
});
const SourceCellStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'inline-block'
});
//# sourceMappingURL=ShortcutItemStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutListStyle.js":
/*!**********************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/ShortcutListStyle.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutListStyle": () => (/* binding */ ShortcutListStyle),
/* harmony export */   "ShortcutListContainerStyle": () => (/* binding */ ShortcutListContainerStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const ShortcutListStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    display: 'table',
    borderCollapse: 'collapse'
});
function ShortcutListContainerStyle(topNavHeight, widgetHeight) {
    return (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
        overflowY: 'scroll',
        height: widgetHeight - topNavHeight,
        borderTop: 'solid',
        borderTopColor: 'var(--jp-border-color1)',
        borderTopWidth: 'var(--jp-border-width)'
    });
}
//# sourceMappingURL=ShortcutListStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutTitleItemStyle.js":
/*!***************************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/ShortcutTitleItemStyle.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderStyle": () => (/* binding */ HeaderStyle),
/* harmony export */   "CurrentHeaderStyle": () => (/* binding */ CurrentHeaderStyle),
/* harmony export */   "SortButtonStyle": () => (/* binding */ SortButtonStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const HeaderStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    $nest: {
        '&:hover div': {
            fontWeight: 600,
            color: 'var(--jp-ui-font-color0)'
        },
        '&:focus div': {
            outline: 'none'
        },
        '&:active div': {
            fontWeight: 600,
            color: 'var(--jp-ui-font-color0)'
        }
    }
});
const CurrentHeaderStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& div': {
            color: 'var(--jp-ui-font-color0)',
            fontWeight: 'bold'
        }
    }
});
const SortButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    transform: 'rotate(180deg)',
    marginLeft: '10px',
    color: 'var(--jp-ui-font-color2)',
    border: 'none',
    backgroundColor: 'var(--jp-layout-color0)',
    fontSize: 'var(--jp-ui-font-size1)'
});
//# sourceMappingURL=ShortcutTitleItemStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutUIStyle.js":
/*!********************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/ShortcutUIStyle.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopWhitespaceStyle": () => (/* binding */ TopWhitespaceStyle),
/* harmony export */   "ShortcutUIStyle": () => (/* binding */ ShortcutUIStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const TopWhitespaceStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    content: ' ',
    height: 'var(--jp-toolbar-micro-height)',
    borderBottom: 'var(--jp-border-width) solid var(--jp-toolbar-border-color)',
    boxShadow: 'var(--jp-toolbar-box-shadow)',
    zIndex: 2,
    width: '100%',
    background: 'var(--jp-toolbar-background)',
    position: 'relative'
});
const ShortcutUIStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'var(--jp-ui-font-size1)',
    fontFamily: 'var(--jp-ui-font-family)',
    color: 'var(--jp-content-font-color1)',
    minWidth: '450px',
    width: '100%'
});
//# sourceMappingURL=ShortcutUIStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/componentStyle/TopNavStyle.js":
/*!****************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/componentStyle/TopNavStyle.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopStyle": () => (/* binding */ TopStyle),
/* harmony export */   "TopNavStyle": () => (/* binding */ TopNavStyle),
/* harmony export */   "SymbolsStyle": () => (/* binding */ SymbolsStyle),
/* harmony export */   "SymbolsSmallStyle": () => (/* binding */ SymbolsSmallStyle),
/* harmony export */   "SymbolsRowStyle": () => (/* binding */ SymbolsRowStyle),
/* harmony export */   "SearchContainerStyle": () => (/* binding */ SearchContainerStyle),
/* harmony export */   "SearchStyle": () => (/* binding */ SearchStyle),
/* harmony export */   "AdvancedOptionsContainerStyle": () => (/* binding */ AdvancedOptionsContainerStyle),
/* harmony export */   "AdvancedOptionsStyle": () => (/* binding */ AdvancedOptionsStyle),
/* harmony export */   "AdvancedOptionsSmallStyle": () => (/* binding */ AdvancedOptionsSmallStyle),
/* harmony export */   "AdvancedOptionsRightStyle": () => (/* binding */ AdvancedOptionsRightStyle),
/* harmony export */   "AdvancedOptionsLinkStyle": () => (/* binding */ AdvancedOptionsLinkStyle),
/* harmony export */   "HeaderRowContainerStyle": () => (/* binding */ HeaderRowContainerStyle),
/* harmony export */   "HeaderRowStyle": () => (/* binding */ HeaderRowStyle),
/* harmony export */   "commandIconStyle": () => (/* binding */ commandIconStyle),
/* harmony export */   "altIconStyle": () => (/* binding */ altIconStyle),
/* harmony export */   "controlIconStyle": () => (/* binding */ controlIconStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const TopStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'block'
});
const TopNavStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--jp-layout-color0)',
    zIndex: 1,
    height: '56px'
});
const SymbolsStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '15%',
    display: 'table',
    paddingLeft: '12px',
    lineHeight: '24px',
    paddingTop: '5px'
});
const SymbolsSmallStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    lineHeight: '14px'
});
const SymbolsRowStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    justifyContent: 'center',
    marginBottom: '8px',
    display: 'table-row',
    $nest: {
        '& div': {
            margin: '0px 10px',
            fontSize: 'var(--jp-ui-font-size1)',
            display: 'table-cell'
        },
        '& span': {
            fontSize: 'var(--jp-ui-font-size1)'
        }
    }
});
const SearchContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '60%',
    textAlign: 'center'
});
const SearchStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    borderWidth: 'var(--jp-border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--jp-layout-color3)',
    height: '30px',
    width: '65%',
    fontSize: 'var(--jp-ui-font-size1)',
    color: 'var(--jp-ui-font-color0)',
    paddingLeft: '6px',
    backgroundColor: 'var(--jp-layout-color1)',
    backgroundImage: 'var(--jp-icon-search)',
    backgroundSize: '18px',
    backgroundPositionY: '6px',
    backgroundPositionX: '98%',
    backgroundRepeat: 'no-repeat',
    marginTop: '8px',
    outline: 'none',
    $nest: {
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--md-blue-500)',
            boxShadow: 'inset 0 0 4px var(--md-blue-300)'
        },
        '&::placeholder': {
            color: 'var(--jp-ui-font-color2)'
        }
    }
});
const AdvancedOptionsContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'contents'
});
const AdvancedOptionsStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'block',
    paddingTop: '5px'
});
const AdvancedOptionsSmallStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '30%'
});
const AdvancedOptionsRightStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '8px'
});
function AdvancedOptionsLinkStyle(size) {
    if (size === 0 /* Regular */) {
        return (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
            color: 'var(--jp-brand-color2)',
            textDecoration: 'none',
            marginRight: '15px',
            $nest: {
                '&:hover': {
                    color: 'var(--jp-brand-color1)'
                },
                '&:active': {
                    color: 'var(--jp-brand-color0)'
                }
            }
        });
    }
    else {
        return (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
            color: 'var(--jp-brand-color2)',
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block',
            $nest: {
                '&:hover': {
                    color: 'var(--jp-brand-color1)'
                },
                '&:active': {
                    color: 'var(--jp-brand-color0)'
                }
            }
        });
    }
}
const HeaderRowContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingRight: '14px'
});
const HeaderRowStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 'bold',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--jp-layout-color0)',
    width: '100%',
    zIndex: 1,
    display: 'table',
    padding: '10px 0'
});
const commandIconStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginRight: '13px'
});
const altIconStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginLeft: '14px'
});
const controlIconStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginLeft: '8px',
    marginRight: '16px'
});
//# sourceMappingURL=TopNavStyle.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/ShortcutInput.js":
/*!**************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/ShortcutInput.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutObject": () => (/* binding */ ShortcutObject),
/* harmony export */   "ErrorObject": () => (/* binding */ ErrorObject),
/* harmony export */   "TakenByObject": () => (/* binding */ TakenByObject),
/* harmony export */   "ShortcutInput": () => (/* binding */ ShortcutInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/keyboard */ "webpack/sharing/consume/default/@lumino/keyboard/@lumino/keyboard?274e");
/* harmony import */ var _lumino_keyboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_keyboard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../componentStyle/ShortcutInputStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutInputStyle.js");




/** Object for shortcut items */
class ShortcutObject {
    constructor() {
        this.commandName = '';
        this.label = '';
        this.keys = {};
        this.source = '';
        this.selector = '';
        this.category = '';
        this.id = '';
        this.numberOfShortcuts = 0;
        this.hasConflict = false;
    }
    get(sortCriteria) {
        if (sortCriteria === 'label') {
            return this.label;
        }
        else if (sortCriteria === 'selector') {
            return this.selector;
        }
        else if (sortCriteria === 'category') {
            return this.category;
        }
        else if (sortCriteria === 'source') {
            return this.source;
        }
        else {
            return '';
        }
    }
}
/** Object for conflicting shortcut error messages */
class ErrorObject extends ShortcutObject {
    constructor() {
        super();
        this.takenBy = new TakenByObject();
    }
}
/** Object for showing which shortcut conflicts with the new one */
class TakenByObject {
    constructor(shortcut) {
        if (shortcut) {
            this.takenBy = shortcut;
            this.takenByKey = '';
            this.takenByLabel = shortcut.category + ': ' + shortcut.label;
            this.id = shortcut.commandName + '_' + shortcut.selector;
        }
        else {
            this.takenBy = new ShortcutObject();
            this.takenByKey = '';
            this.takenByLabel = '';
            this.id = '';
        }
    }
}
class ShortcutInput extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.handleUpdate = () => {
            let keys = this.state.keys;
            keys.push(this.state.currentChain);
            this.setState({ keys: keys });
            this.props.handleUpdate(this.props.shortcut, this.state.keys);
        };
        this.handleOverwrite = async () => {
            this.props
                .deleteShortcut(this.state.takenByObject.takenBy, this.state.takenByObject.takenByKey)
                .then(this.handleUpdate());
        };
        this.handleReplace = async () => {
            let keys = this.state.keys;
            keys.push(this.state.currentChain);
            this.props.toggleInput();
            await this.props.deleteShortcut(this.props.shortcut, this.props.shortcutId);
            this.props.handleUpdate(this.props.shortcut, keys);
        };
        /** Parse user input for chained shortcuts */
        this.parseChaining = (event, value, userInput, keys, currentChain) => {
            let key = _lumino_keyboard__WEBPACK_IMPORTED_MODULE_2__.EN_US.keyForKeydownEvent(event.nativeEvent);
            const modKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Ctrl', 'Accel'];
            if (event.key === 'Backspace') {
                userInput = '';
                value = '';
                keys = [];
                currentChain = '';
                this.setState({
                    value: value,
                    userInput: userInput,
                    keys: keys,
                    currentChain: currentChain
                });
            }
            else if (event.key !== 'CapsLock') {
                const lastKey = userInput
                    .substr(userInput.lastIndexOf(' ') + 1, userInput.length)
                    .trim();
                /** if last key was not a modefier then there is a chain */
                if (modKeys.lastIndexOf(lastKey) === -1 && lastKey != '') {
                    userInput = userInput + ',';
                    keys.push(currentChain);
                    currentChain = '';
                    /** check if a modefier key was held down through chain */
                    if (event.ctrlKey && event.key != 'Control') {
                        userInput = (userInput + ' Ctrl').trim();
                        currentChain = (currentChain + ' Ctrl').trim();
                    }
                    if (event.metaKey && event.key != 'Meta') {
                        userInput = (userInput + ' Accel').trim();
                        currentChain = (currentChain + ' Accel').trim();
                    }
                    if (event.altKey && event.key != 'Alt') {
                        userInput = (userInput + ' Alt').trim();
                        currentChain = (currentChain + ' Alt').trim();
                    }
                    if (event.shiftKey && event.key != 'Shift') {
                        userInput = (userInput + ' Shift').trim();
                        currentChain = (currentChain + ' Shift').trim();
                    }
                    /** if not a modefier key, add to user input and current chain */
                    if (modKeys.lastIndexOf(event.key) === -1) {
                        userInput = (userInput + ' ' + key).trim();
                        currentChain = (currentChain + ' ' + key).trim();
                        /** if a modefier key, add to user input and current chain */
                    }
                    else {
                        if (event.key === 'Meta') {
                            userInput = (userInput + ' Accel').trim();
                            currentChain = (currentChain + ' Accel').trim();
                        }
                        else if (event.key === 'Control') {
                            userInput = (userInput + ' Ctrl').trim();
                            currentChain = (currentChain + ' Ctrl').trim();
                        }
                        else if (event.key === 'Shift') {
                            userInput = (userInput + ' Shift').trim();
                            currentChain = (currentChain + ' Shift').trim();
                        }
                        else if (event.key === 'Alt') {
                            userInput = (userInput + ' Alt').trim();
                            currentChain = (currentChain + ' Alt').trim();
                        }
                        else {
                            userInput = (userInput + ' ' + event.key).trim();
                            currentChain = (currentChain + ' ' + event.key).trim();
                        }
                    }
                    /** if not a chain, add the key to user input and current chain */
                }
                else {
                    /** if modefier key, rename */
                    if (event.key === 'Control') {
                        userInput = (userInput + ' Ctrl').trim();
                        currentChain = (currentChain + ' Ctrl').trim();
                    }
                    else if (event.key === 'Meta') {
                        userInput = (userInput + ' Accel').trim();
                        currentChain = (currentChain + ' Accel').trim();
                    }
                    else if (event.key === 'Shift') {
                        userInput = (userInput + ' Shift').trim();
                        currentChain = (currentChain + ' Shift').trim();
                    }
                    else if (event.key === 'Alt') {
                        userInput = (userInput + ' Alt').trim();
                        currentChain = (currentChain + ' Alt').trim();
                        /** if not a modefier key, add it regularly */
                    }
                    else {
                        userInput = (userInput + ' ' + key).trim();
                        currentChain = (currentChain + ' ' + key).trim();
                    }
                }
            }
            /** update state of keys and currentChain */
            this.setState({
                keys: keys,
                currentChain: currentChain
            });
            return [userInput, keys, currentChain];
        };
        /**
         * Check if shorcut being typed will work
         * (does not end with ctrl, alt, command, or shift)
         * */
        this.checkNonFunctional = (shortcut) => {
            const dontEnd = ['Ctrl', 'Alt', 'Accel', 'Shift'];
            const shortcutKeys = this.state.currentChain.split(' ');
            const last = shortcutKeys[shortcutKeys.length - 1];
            this.setState({
                isFunctional: !(dontEnd.indexOf(last) !== -1)
            });
            return dontEnd.indexOf(last) !== -1;
        };
        /** Check if shortcut being typed is already taken */
        this.checkShortcutAvailability = (userInput, keys, currentChain) => {
            /** First, check whole shortcut */
            let isAvailable = Object.keys(this.props.keyBindingsUsed).indexOf(keys.join(' ') + currentChain + '_' + this.props.shortcut.selector) === -1 || userInput === '';
            let takenByObject = new TakenByObject();
            if (isAvailable) {
                /** Next, check each piece of a chain */
                for (let binding of keys) {
                    if (Object.keys(this.props.keyBindingsUsed).indexOf(binding + '_' + this.props.shortcut.selector) !== -1 &&
                        binding !== '') {
                        isAvailable = false;
                        takenByObject = this.props.keyBindingsUsed[binding + '_' + this.props.shortcut.selector];
                        break;
                    }
                }
                /** Check current chain */
                if (isAvailable &&
                    Object.keys(this.props.keyBindingsUsed).indexOf(currentChain + '_' + this.props.shortcut.selector) !== -1 &&
                    currentChain !== '') {
                    isAvailable = false;
                    takenByObject = this.props.keyBindingsUsed[currentChain + '_' + this.props.shortcut.selector];
                }
                /** If unavailable set takenByObject */
            }
            else {
                takenByObject = this.props.keyBindingsUsed[keys.join(' ') + currentChain + '_' + this.props.shortcut.selector];
            }
            /** allow to set shortcut to what it initially was if replacing */
            if (!isAvailable) {
                if (takenByObject.takenBy.id === this.props.shortcut.id &&
                    this.props.newOrReplace === 'replace') {
                    isAvailable = true;
                    takenByObject = new TakenByObject();
                }
            }
            this.setState({ isAvailable: isAvailable });
            return takenByObject;
        };
        /** Parse and normalize user input */
        this.handleInput = (event) => {
            event.preventDefault();
            this.setState({ selected: false });
            const parsed = this.parseChaining(event, this.state.value, this.state.userInput, this.state.keys, this.state.currentChain);
            const userInput = parsed[0];
            const keys = parsed[1];
            const currentChain = parsed[2];
            const value = this.props.toSymbols(userInput);
            let takenByObject = this.checkShortcutAvailability(userInput, keys, currentChain);
            this.checkConflict(takenByObject, keys);
            this.setState({
                value: value,
                userInput: userInput,
                takenByObject: takenByObject,
                keys: keys,
                currentChain: currentChain
            }, () => this.checkNonFunctional(this.state.userInput));
        };
        this.handleBlur = (event) => {
            if (event.relatedTarget === null ||
                (event.relatedTarget.id !== 'no-blur' &&
                    event.relatedTarget.id !== 'overwrite')) {
                this.props.toggleInput();
                this.setState({
                    value: '',
                    userInput: ''
                });
                this.props.clearConflicts();
            }
        };
        this.state = {
            value: this.props.placeholder,
            userInput: '',
            isAvailable: true,
            isFunctional: this.props.newOrReplace === 'replace',
            takenByObject: new TakenByObject(),
            keys: new Array(),
            currentChain: '',
            selected: true
        };
    }
    checkConflict(takenByObject, keys) {
        if (takenByObject.id !== '' &&
            takenByObject.takenBy.id !== this.props.shortcut.id) {
            this.props.sortConflict(this.props.shortcut, takenByObject, takenByObject.takenByLabel, '');
        }
        else {
            this.props.clearConflicts();
        }
    }
    render() {
        const trans = this.props.translator.load('jupyterlab');
        let inputClassName = _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputStyle;
        if (!this.state.isAvailable) {
            inputClassName = (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(inputClassName, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputUnavailableStyle);
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: this.props.displayInput
                ? this.props.newOrReplace === 'new'
                    ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputBoxStyle, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputBoxNewStyle)
                    : _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputBoxStyle
                : _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputBoxHiddenStyle, onBlur: event => this.handleBlur(event) },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { tabIndex: 0, id: "no-blur", className: inputClassName, onKeyDown: this.handleInput, ref: input => input && input.focus() },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: this.state.selected && this.props.newOrReplace === 'replace'
                        ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputTextStyle, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputSelectedTextStyle)
                        : this.state.value === ''
                            ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputTextStyle, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputWaitingStyle)
                            : _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.InputTextStyle }, this.state.value === ''
                    ? trans.__('press keys')
                    : this.state.value)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: !this.state.isFunctional
                    ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.SubmitStyle, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.SubmitNonFunctionalStyle)
                    : !this.state.isAvailable
                        ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.SubmitStyle, _componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.SubmitConflictStyle)
                        : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutInputStyle__WEBPACK_IMPORTED_MODULE_3__.SubmitStyle), id: 'no-blur', disabled: !this.state.isAvailable || !this.state.isFunctional, onClick: () => {
                    if (this.props.newOrReplace === 'new') {
                        this.handleUpdate();
                        this.setState({
                            value: '',
                            keys: [],
                            currentChain: ''
                        });
                        this.props.toggleInput();
                    }
                    else {
                        /** don't replace if field has not been edited */
                        if (this.state.selected) {
                            this.props.toggleInput();
                            this.setState({
                                value: '',
                                userInput: ''
                            });
                            this.props.clearConflicts();
                        }
                        else {
                            void this.handleReplace();
                        }
                    }
                } }),
            !this.state.isAvailable && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { hidden: true, id: "overwrite", onClick: () => {
                    void this.handleOverwrite();
                    this.props.clearConflicts();
                    this.props.toggleInput();
                } }, trans.__('Overwrite')))));
    }
}
//# sourceMappingURL=ShortcutInput.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/ShortcutItem.js":
/*!*************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/ShortcutItem.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutItem": () => (/* binding */ ShortcutItem)
/* harmony export */ });
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../componentStyle/ShortcutItemStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutItemStyle.js");
/* harmony import */ var _ShortcutInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShortcutInput */ "../../packages/shortcuts-extension/lib/components/ShortcutInput.js");





var ShortCutLocation;
(function (ShortCutLocation) {
    ShortCutLocation[ShortCutLocation["Left"] = 0] = "Left";
    ShortCutLocation[ShortCutLocation["Right"] = 1] = "Right";
})(ShortCutLocation || (ShortCutLocation = {}));
/** Describe commands that are used by shortcuts */
function getCommands(trans) {
    return {
        shortcutEditLeft: {
            commandId: 'shortcutui:EditLeft',
            label: trans.__('Edit First'),
            caption: trans.__('Edit existing shortcut')
        },
        shortcutEditRight: {
            commandId: 'shortcutui:EditRight',
            label: trans.__('Edit Second'),
            caption: trans.__('Edit existing shortcut')
        },
        shortcutEdit: {
            commandId: 'shortcutui:Edit',
            label: trans.__('Edit'),
            caption: trans.__('Edit existing shortcut')
        },
        shortcutAddNew: {
            commandId: 'shortcutui:AddNew',
            label: trans.__('Add'),
            caption: trans.__('Add new shortcut')
        },
        shortcutAddAnother: {
            commandId: 'shortcutui:AddAnother',
            label: trans.__('Add'),
            caption: trans.__('Add another shortcut')
        },
        shortcutReset: {
            commandId: 'shortcutui:Reset',
            label: trans.__('Reset'),
            caption: trans.__('Reset shortcut back to default')
        }
    };
}
/** React component for each command shortcut item */
class ShortcutItem extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(props) {
        super(props);
        /** Toggle display state of input box */
        this.toggleInputNew = () => {
            this.setState({
                displayNewInput: !this.state.displayNewInput
            });
        };
        this.toggleInputReplaceLeft = () => {
            this.setState({
                displayReplaceInputLeft: !this.state.displayReplaceInputLeft
            });
        };
        this.toggleInputReplaceRight = () => {
            this.setState({
                displayReplaceInputRight: !this.state.displayReplaceInputRight
            });
        };
        this.addCommandIfNeeded = (command, action) => {
            const key = this.props.shortcut.commandName + '_' + this.props.shortcut.selector;
            if (!this.props.external.hasCommand(command.commandId + key)) {
                this.props.external.addCommand(command.commandId + key, {
                    label: command.label,
                    caption: command.caption,
                    execute: action
                });
            }
        };
        this.handleRightClick = (e) => {
            this.addCommandIfNeeded(this._commands.shortcutEdit, () => this.toggleInputReplaceLeft());
            this.addCommandIfNeeded(this._commands.shortcutEditLeft, () => this.toggleInputReplaceLeft());
            this.addCommandIfNeeded(this._commands.shortcutEditRight, () => this.toggleInputReplaceRight());
            this.addCommandIfNeeded(this._commands.shortcutAddNew, () => this.toggleInputNew());
            this.addCommandIfNeeded(this._commands.shortcutAddAnother, () => this.toggleInputNew());
            this.addCommandIfNeeded(this._commands.shortcutReset, () => this.props.resetShortcut(this.props.shortcut));
            const key = this.props.shortcut.commandName + '_' + this.props.shortcut.selector;
            this.setState({
                numShortcuts: Object.keys(this.props.shortcut.keys).filter(key => this.props.shortcut.keys[key][0] !== '').length
            }, () => {
                let commandList = [];
                if (this.state.numShortcuts == 2) {
                    commandList = commandList.concat([
                        this._commands.shortcutEditLeft.commandId + key,
                        this._commands.shortcutEditRight.commandId + key
                    ]);
                }
                else if (this.state.numShortcuts == 1) {
                    commandList = commandList.concat([
                        this._commands.shortcutEdit.commandId + key,
                        this._commands.shortcutAddAnother.commandId + key
                    ]);
                }
                else {
                    commandList = commandList.concat([
                        this._commands.shortcutAddNew.commandId + key
                    ]);
                }
                if (this.props.shortcut.source === 'Custom') {
                    commandList = commandList.concat([
                        this._commands.shortcutReset.commandId + key
                    ]);
                }
                this.props.contextMenu(e, commandList);
            });
        };
        /** Transform special key names into unicode characters */
        this.toSymbols = (value) => {
            return value.split(' ').reduce((result, key) => {
                if (key === 'Ctrl') {
                    return (result + ' ⌃').trim();
                }
                else if (key === 'Alt') {
                    return (result + ' ⌥').trim();
                }
                else if (key === 'Shift') {
                    return (result + ' ⇧').trim();
                }
                else if (key === 'Accel' && _lumino_domutils__WEBPACK_IMPORTED_MODULE_0__.Platform.IS_MAC) {
                    return (result + ' ⌘').trim();
                }
                else if (key === 'Accel') {
                    return (result + ' ⌃').trim();
                }
                else {
                    return (result + ' ' + key).trim();
                }
            }, '');
        };
        this._commands = getCommands(props.external.translator.load('jupyterlab'));
        this.state = {
            displayNewInput: false,
            displayReplaceInputLeft: false,
            displayReplaceInputRight: false,
            numShortcuts: Object.keys(this.props.shortcut.keys).filter(key => this.props.shortcut.keys[key][0] !== '').length
        };
    }
    getErrorRow() {
        const trans = this.props.external.translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.RowStyle) },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: (0,_componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ConflictContainerStyle)(this.props.showSelectors, this.props.errorSize) },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ErrorMessageStyle }, trans.__('Shortcut already in use by %1. Overwrite it?', this.props.shortcut.takenBy.takenByLabel)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ErrorButtonStyle },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", null, trans.__('Cancel')),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { id: "no-blur", onClick: () => {
                            var _a;
                            (_a = document.getElementById('overwrite')) === null || _a === void 0 ? void 0 : _a.click();
                        } }, trans.__('Overwrite'))))));
    }
    getCategoryCell() {
        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle }, this.props.shortcut.category);
    }
    getLabelCell() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "jp-label" }, this.props.shortcut.label)));
    }
    getResetShortCutLink() {
        const trans = this.props.external.translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ResetStyle, onClick: () => this.props.resetShortcut(this.props.shortcut) }, trans.__('Reset')));
    }
    getSourceCell() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.SourceCellStyle }, this.props.shortcut.source),
            this.props.shortcut.source === 'Custom' && this.getResetShortCutLink()));
    }
    getOptionalSelectorCell() {
        return this.props.showSelectors ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "jp-selector" }, this.props.shortcut.selector))) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null));
    }
    getClassNameForShortCuts(nonEmptyKeys) {
        return nonEmptyKeys.length === 0
            ? (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutCellStyle, _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.EmptyShortcutCellStyle)
            : nonEmptyKeys.length === 1
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutCellStyle, _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.SingleShortcutCellStyle)
                : _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutCellStyle;
    }
    getToggleInputReplaceMethod(location) {
        switch (location) {
            case ShortCutLocation.Left:
                return this.toggleInputReplaceLeft;
            case ShortCutLocation.Right:
                return this.toggleInputReplaceRight;
        }
    }
    getDisplayReplaceInput(location) {
        switch (location) {
            case ShortCutLocation.Left:
                return this.state.displayReplaceInputLeft;
            case ShortCutLocation.Right:
                return this.state.displayReplaceInputRight;
        }
    }
    getOrDiplayIfNeeded(nonEmptyKeys) {
        const trans = this.props.external.translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: nonEmptyKeys.length == 2 || this.state.displayNewInput
                ? _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.OrTwoStyle
                : _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.OrStyle, id: nonEmptyKeys.length == 2
                ? 'secondor'
                : this.state.displayReplaceInputLeft
                    ? 'noor'
                    : 'or' }, trans.__('or')));
    }
    getShortCutAsInput(key, location) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ShortcutInput__WEBPACK_IMPORTED_MODULE_4__.ShortcutInput, { handleUpdate: this.props.handleUpdate, deleteShortcut: this.props.deleteShortcut, toggleInput: this.getToggleInputReplaceMethod(location), shortcut: this.props.shortcut, shortcutId: key, toSymbols: this.toSymbols, keyBindingsUsed: this.props.keyBindingsUsed, sortConflict: this.props.sortConflict, clearConflicts: this.props.clearConflicts, displayInput: this.getDisplayReplaceInput(location), newOrReplace: 'replace', placeholder: this.toSymbols(this.props.shortcut.keys[key].join(', ')), translator: this.props.external.translator }));
    }
    getShortCutForDisplayOnly(key) {
        return this.props.shortcut.keys[key].map((keyBinding, index) => (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutKeysContainerStyle, key: index },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutKeysStyle, id: 'shortcut-keys' }, this.toSymbols(keyBinding)),
            index + 1 < this.props.shortcut.keys[key].length ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CommaStyle }, ",")) : null)));
    }
    isLocationBeingEdited(location) {
        return ((location === ShortCutLocation.Left &&
            this.state.displayReplaceInputLeft) ||
            (location === ShortCutLocation.Right &&
                this.state.displayReplaceInputRight));
    }
    getLocationFromIndex(index) {
        return index === 0 ? ShortCutLocation.Left : ShortCutLocation.Right;
    }
    getDivForKey(index, key, nonEmptyKeys) {
        const location = this.getLocationFromIndex(index);
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutContainerStyle, key: this.props.shortcut.id + '_' + index, onClick: this.getToggleInputReplaceMethod(location) },
            this.isLocationBeingEdited(location)
                ? this.getShortCutAsInput(key, location)
                : this.getShortCutForDisplayOnly(key),
            location === ShortCutLocation.Left &&
                this.getOrDiplayIfNeeded(nonEmptyKeys)));
    }
    getAddLink() {
        const trans = this.props.external.translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { className: !this.state.displayNewInput ? _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.PlusStyle : '', onClick: () => {
                this.toggleInputNew(), this.props.clearConflicts();
            }, id: "add-link" }, trans.__('Add')));
    }
    getInputBoxWhenToggled() {
        return this.state.displayNewInput ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ShortcutInput__WEBPACK_IMPORTED_MODULE_4__.ShortcutInput, { handleUpdate: this.props.handleUpdate, deleteShortcut: this.props.deleteShortcut, toggleInput: this.toggleInputNew, shortcut: this.props.shortcut, shortcutId: "", toSymbols: this.toSymbols, keyBindingsUsed: this.props.keyBindingsUsed, sortConflict: this.props.sortConflict, clearConflicts: this.props.clearConflicts, displayInput: this.state.displayNewInput, newOrReplace: 'new', placeholder: '', translator: this.props.external.translator })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null));
    }
    getShortCutsCell(nonEmptyKeys) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: this.getClassNameForShortCuts(nonEmptyKeys) },
                nonEmptyKeys.map((key, index) => this.getDivForKey(index, key, nonEmptyKeys)),
                nonEmptyKeys.length === 1 &&
                    !this.state.displayNewInput &&
                    !this.state.displayReplaceInputLeft &&
                    this.getAddLink(),
                nonEmptyKeys.length === 0 &&
                    !this.state.displayNewInput &&
                    this.getAddLink(),
                this.getInputBoxWhenToggled())));
    }
    render() {
        const nonEmptyKeys = Object.keys(this.props.shortcut.keys).filter((key) => this.props.shortcut.keys[key][0] !== '');
        if (this.props.shortcut.id === 'error_row') {
            return this.getErrorRow();
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.RowStyle, onContextMenu: e => {
                    e.persist();
                    this.handleRightClick(e);
                } },
                this.getCategoryCell(),
                this.getLabelCell(),
                this.getShortCutsCell(nonEmptyKeys),
                this.getSourceCell(),
                this.getOptionalSelectorCell()));
        }
    }
}
//# sourceMappingURL=ShortcutItem.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/ShortcutList.js":
/*!*************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/ShortcutList.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutList": () => (/* binding */ ShortcutList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _componentStyle_ShortcutListStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../componentStyle/ShortcutListStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutListStyle.js");
/* harmony import */ var _ShortcutItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShortcutItem */ "../../packages/shortcuts-extension/lib/components/ShortcutItem.js");



const TOPNAV_HEIGHT = 115;
/** React component for list of shortcuts */
class ShortcutList extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: (0,_componentStyle_ShortcutListStyle__WEBPACK_IMPORTED_MODULE_1__.ShortcutListContainerStyle)(TOPNAV_HEIGHT, this.props.height), id: "shortcutListContainer" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_ShortcutListStyle__WEBPACK_IMPORTED_MODULE_1__.ShortcutListStyle }, this.props.shortcuts.map((shortcut) => {
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ShortcutItem__WEBPACK_IMPORTED_MODULE_2__.ShortcutItem, { key: shortcut.commandName + '_' + shortcut.selector, resetShortcut: this.props.resetShortcut, shortcut: shortcut, handleUpdate: this.props.handleUpdate, deleteShortcut: this.props.deleteShortcut, showSelectors: this.props.showSelectors, keyBindingsUsed: this.props.keyBindingsUsed, sortConflict: this.props.sortConflict, clearConflicts: this.props.clearConflicts, errorSize: this.props.errorSize, contextMenu: this.props.contextMenu, external: this.props.external }));
            }))));
    }
}
//# sourceMappingURL=ShortcutList.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/ShortcutTitleItem.js":
/*!******************************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/ShortcutTitleItem.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutTitleItem": () => (/* binding */ ShortcutTitleItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle_ShortcutTitleItemStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle/ShortcutTitleItemStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutTitleItemStyle.js");



class ShortcutTitleItem extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: this.props.title.toLowerCase() === this.props.active
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_ShortcutTitleItemStyle__WEBPACK_IMPORTED_MODULE_2__.HeaderStyle, _componentStyle_ShortcutTitleItemStyle__WEBPACK_IMPORTED_MODULE_2__.CurrentHeaderStyle)
                : _componentStyle_ShortcutTitleItemStyle__WEBPACK_IMPORTED_MODULE_2__.HeaderStyle, onClick: () => this.props.updateSort(this.props.title.toLowerCase()) },
            this.props.title,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_ShortcutTitleItemStyle__WEBPACK_IMPORTED_MODULE_2__.SortButtonStyle }, "\u2303")));
    }
}
//# sourceMappingURL=ShortcutTitleItem.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/ShortcutUI.js":
/*!***********************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/ShortcutUI.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutUI": () => (/* binding */ ShortcutUI)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _componentStyle_ShortcutUIStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../componentStyle/ShortcutUIStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutUIStyle.js");
/* harmony import */ var _ShortcutList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ShortcutList */ "../../packages/shortcuts-extension/lib/components/ShortcutList.js");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TopNav */ "../../packages/shortcuts-extension/lib/components/TopNav.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ShortcutInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShortcutInput */ "../../packages/shortcuts-extension/lib/components/ShortcutInput.js");






/** Normalize the query text for a fuzzy search. */
function normalizeQuery(text) {
    return text.replace(/\s+/g, '').toLowerCase();
}
/** Perform a fuzzy search on a single command item. */
function fuzzySearch(item, query) {
    // Create the source text to be searched.
    const category = item.category.toLowerCase();
    const label = item['label'].toLowerCase();
    const source = `${category} ${label}`;
    // Set up the match score and indices array.
    let score = Infinity;
    let indices = null;
    // The regex for search word boundaries
    const rgx = /\b\w/g;
    // Search the source by word boundary.
    // eslint-disable-next-line
    while (true) {
        // Find the next word boundary in the source.
        const rgxMatch = rgx.exec(source);
        // Break if there is no more source context.
        if (!rgxMatch) {
            break;
        }
        // Run the string match on the relevant substring.
        const match = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.StringExt.matchSumOfDeltas(source, query, rgxMatch.index);
        // Break if there is no match.
        if (!match) {
            break;
        }
        // Update the match if the score is better.
        if (match && match.score <= score) {
            score = match.score;
            indices = match.indices;
        }
    }
    // Bail if there was no match.
    if (!indices || score === Infinity) {
        return null;
    }
    // Compute the pivot index between category and label text.
    const pivot = category.length + 1;
    // Find the slice index to separate matched indices.
    const j = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.lowerBound(indices, pivot, (a, b) => a - b);
    // Extract the matched category and label indices.
    const categoryIndices = indices.slice(0, j);
    const labelIndices = indices.slice(j);
    // Adjust the label indices for the pivot offset.
    for (let i = 0, n = labelIndices.length; i < n; ++i) {
        labelIndices[i] -= pivot;
    }
    // Handle a pure label match.
    if (categoryIndices.length === 0) {
        return {
            matchType: 0 /* Label */,
            categoryIndices: null,
            labelIndices,
            score,
            item
        };
    }
    // Handle a pure category match.
    if (labelIndices.length === 0) {
        return {
            matchType: 1 /* Category */,
            categoryIndices,
            labelIndices: null,
            score,
            item
        };
    }
    // Handle a split match.
    return {
        matchType: 2 /* Split */,
        categoryIndices,
        labelIndices,
        score,
        item
    };
}
/** Perform a fuzzy match on an array of command items. */
function matchItems(items, query) {
    // Normalize the query text to lower case with no whitespace.
    query = normalizeQuery(query);
    // Create the array to hold the scores.
    let scores = [];
    // Iterate over the items and match against the query.
    let itemList = Object.keys(items);
    for (let i = 0, n = itemList.length; i < n; ++i) {
        let item = items[itemList[i]];
        // If the query is empty, all items are matched by default.
        if (!query) {
            scores.push({
                matchType: 3 /* Default */,
                categoryIndices: null,
                labelIndices: null,
                score: 0,
                item
            });
            continue;
        }
        // Run the fuzzy search for the item and query.
        let score = fuzzySearch(item, query);
        // Ignore the item if it is not a match.
        if (!score) {
            continue;
        }
        // Add the score to the results.
        scores.push(score);
    }
    // Return the final array of scores.
    return scores;
}
/** Transform SettingRegistry's shortcut list to list of ShortcutObjects */
function getShortcutObjects(external, settings) {
    const shortcuts = settings.composite.shortcuts;
    let shortcutObjects = {};
    shortcuts.forEach((shortcut) => {
        let key = shortcut.command + '_' + shortcut.selector;
        if (Object.keys(shortcutObjects).indexOf(key) !== -1) {
            let currentCount = shortcutObjects[key].numberOfShortcuts;
            shortcutObjects[key].keys[currentCount] = shortcut.keys;
            shortcutObjects[key].numberOfShortcuts++;
        }
        else {
            let shortcutObject = new _ShortcutInput__WEBPACK_IMPORTED_MODULE_2__.ShortcutObject();
            shortcutObject.commandName = shortcut.command;
            let label = external.getLabel(shortcut.command);
            if (!label) {
                label = shortcut.command.split(':')[1];
            }
            shortcutObject.label = label;
            shortcutObject.category = shortcut.command.split(':')[0];
            shortcutObject.keys[0] = shortcut.keys;
            shortcutObject.selector = shortcut.selector;
            // TODO needs translation
            shortcutObject.source = 'Default';
            shortcutObject.id = key;
            shortcutObject.numberOfShortcuts = 1;
            shortcutObjects[key] = shortcutObject;
        }
    });
    // find all the shortcuts that have custom settings
    const userShortcuts = settings.user.shortcuts;
    userShortcuts.forEach((userSetting) => {
        const command = userSetting.command;
        const selector = userSetting.selector;
        const keyTo = command + '_' + selector;
        if (shortcutObjects[keyTo]) {
            // TODO needs translation
            shortcutObjects[keyTo].source = 'Custom';
        }
    });
    return shortcutObjects;
}
/** Get list of all shortcut keybindings currently in use
 * An object where keys are unique keyBinding_selector and values are shortcut objects **/
function getKeyBindingsUsed(shortcutObjects) {
    let keyBindingsUsed = {};
    Object.keys(shortcutObjects).forEach((shortcut) => {
        Object.keys(shortcutObjects[shortcut].keys).forEach((key) => {
            const takenBy = new _ShortcutInput__WEBPACK_IMPORTED_MODULE_2__.TakenByObject(shortcutObjects[shortcut]);
            takenBy.takenByKey = key;
            keyBindingsUsed[shortcutObjects[shortcut].keys[key].join(' ') +
                '_' +
                shortcutObjects[shortcut].selector] = takenBy;
        });
    });
    return keyBindingsUsed;
}
/** Top level React component for widget */
class ShortcutUI extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(props) {
        super(props);
        /** Set the current seach query */
        this.updateSearchQuery = (event) => {
            this.setState({
                searchQuery: event.target['value']
            }, () => this.setState({
                filteredShortcutList: this.searchFilterShortcuts(this.state.shortcutList)
            }, () => {
                this.sortShortcuts();
            }));
        };
        /** Reset all shortcuts to their defaults */
        this.resetShortcuts = async () => {
            const settings = await this.props.external.getAllShortCutSettings();
            for (const key of Object.keys(settings.user)) {
                await this.props.external.removeShortCut(key);
            }
            await this._refreshShortcutList();
        };
        /** Set new shortcut for command, refresh state */
        this.handleUpdate = async (shortcutObject, keys) => {
            const settings = await this.props.external.getAllShortCutSettings();
            const userShortcuts = settings.user.shortcuts;
            const newUserShortcuts = [];
            let found = false;
            for (let shortcut of userShortcuts) {
                if (shortcut['command'] === shortcutObject.commandName &&
                    shortcut['selector'] === shortcutObject.selector) {
                    newUserShortcuts.push({
                        command: shortcut['command'],
                        selector: shortcut['selector'],
                        keys: keys
                    });
                    found = true;
                }
                else {
                    newUserShortcuts.push(shortcut);
                }
            }
            if (!found) {
                newUserShortcuts.push({
                    command: shortcutObject.commandName,
                    selector: shortcutObject.selector,
                    keys: keys
                });
            }
            await settings.set('shortcuts', newUserShortcuts);
            await this._refreshShortcutList();
        };
        /** Delete shortcut for command, refresh state */
        this.deleteShortcut = async (shortcutObject, shortcutId) => {
            await this.handleUpdate(shortcutObject, ['']);
            await this._refreshShortcutList();
        };
        /** Reset a specific shortcut to its default settings */
        this.resetShortcut = async (shortcutObject) => {
            const settings = await this.props.external.getAllShortCutSettings();
            const userShortcuts = settings.user.shortcuts;
            const newUserShortcuts = [];
            for (let shortcut of userShortcuts) {
                if (shortcut['command'] !== shortcutObject.commandName ||
                    shortcut['selector'] !== shortcutObject.selector) {
                    newUserShortcuts.push(shortcut);
                }
            }
            await settings.set('shortcuts', newUserShortcuts);
            await this._refreshShortcutList();
        };
        /** Toggles showing command selectors */
        this.toggleSelectors = () => {
            this.setState({ showSelectors: !this.state.showSelectors });
        };
        /** Set the current list sort order */
        this.updateSort = (value) => {
            if (value !== this.state.currentSort) {
                this.setState({ currentSort: value }, this.sortShortcuts);
            }
        };
        /** Sort shortcut list so that an error row is right below the one currently being set */
        this.sortConflict = (newShortcut, takenBy) => {
            const shortcutList = this.state.filteredShortcutList;
            if (shortcutList.filter(shortcut => shortcut.id === 'error_row').length === 0) {
                const errorRow = new _ShortcutInput__WEBPACK_IMPORTED_MODULE_2__.ErrorObject();
                errorRow.takenBy = takenBy;
                errorRow.id = 'error_row';
                shortcutList.splice(shortcutList.indexOf(newShortcut) + 1, 0, errorRow);
                errorRow.hasConflict = true;
                this.setState({ filteredShortcutList: shortcutList });
            }
        };
        /** Remove conflict flag from all shortcuts */
        this.clearConflicts = () => {
            /** Remove error row */
            const shortcutList = this.state.filteredShortcutList.filter(shortcut => shortcut.id !== 'error_row');
            shortcutList.forEach((shortcut) => {
                shortcut.hasConflict = false;
            });
            this.setState({ filteredShortcutList: shortcutList });
        };
        this.contextMenu = (event, commandIDs) => {
            event.persist();
            this.setState({
                contextMenu: this.props.external.createMenu()
            }, () => {
                event.preventDefault();
                for (let command of commandIDs) {
                    this.state.contextMenu.addItem({ command });
                }
                this.state.contextMenu.open(event.clientX, event.clientY);
            });
        };
        this.state = {
            shortcutList: {},
            filteredShortcutList: new Array(),
            shortcutsFetched: false,
            searchQuery: '',
            showSelectors: false,
            currentSort: 'category',
            keyBindingsUsed: {},
            contextMenu: this.props.external.createMenu()
        };
    }
    /** Fetch shortcut list on mount */
    componentDidMount() {
        void this._refreshShortcutList();
    }
    /** Fetch shortcut list from SettingRegistry  */
    async _refreshShortcutList() {
        const shortcuts = await this.props.external.getAllShortCutSettings();
        const shortcutObjects = getShortcutObjects(this.props.external, shortcuts);
        this.setState({
            shortcutList: shortcutObjects,
            filteredShortcutList: this.searchFilterShortcuts(shortcutObjects),
            shortcutsFetched: true
        }, () => {
            let keyBindingsUsed = getKeyBindingsUsed(shortcutObjects);
            this.setState({ keyBindingsUsed });
            this.sortShortcuts();
        });
    }
    /** Filter shortcut list using current search query */
    searchFilterShortcuts(shortcutObjects) {
        const filteredShortcuts = matchItems(shortcutObjects, this.state.searchQuery).map((item) => {
            return item.item;
        });
        return filteredShortcuts;
    }
    /** Sort shortcut list using current sort property  */
    sortShortcuts() {
        const shortcuts = this.state.filteredShortcutList;
        let filterCritera = this.state.currentSort;
        if (filterCritera === 'command') {
            filterCritera = 'label';
        }
        if (filterCritera !== '') {
            shortcuts.sort((a, b) => {
                const compareA = a.get(filterCritera);
                const compareB = b.get(filterCritera);
                if (compareA < compareB) {
                    return -1;
                }
                else if (compareA > compareB) {
                    return 1;
                }
                else {
                    return a['label'] < b['label'] ? -1 : a['label'] > b['label'] ? 1 : 0;
                }
            });
        }
        this.setState({ filteredShortcutList: shortcuts });
    }
    render() {
        if (!this.state.shortcutsFetched) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutUIStyle__WEBPACK_IMPORTED_MODULE_3__.ShortcutUIStyle, id: "jp-shortcutui" },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _componentStyle_ShortcutUIStyle__WEBPACK_IMPORTED_MODULE_3__.TopWhitespaceStyle }),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_TopNav__WEBPACK_IMPORTED_MODULE_4__.TopNav, { updateSearchQuery: this.updateSearchQuery, resetShortcuts: this.resetShortcuts, toggleSelectors: this.toggleSelectors, showSelectors: this.state.showSelectors, updateSort: this.updateSort, currentSort: this.state.currentSort, width: this.props.width, external: this.props.external }),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ShortcutList__WEBPACK_IMPORTED_MODULE_5__.ShortcutList, { shortcuts: this.state.filteredShortcutList, resetShortcut: this.resetShortcut, handleUpdate: this.handleUpdate, deleteShortcut: this.deleteShortcut, showSelectors: this.state.showSelectors, keyBindingsUsed: this.state.keyBindingsUsed, sortConflict: this.sortConflict, clearConflicts: this.clearConflicts, height: this.props.height, errorSize: this.props.width < 775 ? 1 /* Small */ : 0 /* Regular */, contextMenu: this.contextMenu, external: this.props.external })));
    }
}
//# sourceMappingURL=ShortcutUI.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/components/TopNav.js":
/*!*******************************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/components/TopNav.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandIDs": () => (/* binding */ CommandIDs),
/* harmony export */   "TopNav": () => (/* binding */ TopNav)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../componentStyle/ShortcutItemStyle */ "../../packages/shortcuts-extension/lib/componentStyle/ShortcutItemStyle.js");
/* harmony import */ var _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle/TopNavStyle */ "../../packages/shortcuts-extension/lib/componentStyle/TopNavStyle.js");
/* harmony import */ var _ShortcutTitleItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShortcutTitleItem */ "../../packages/shortcuts-extension/lib/components/ShortcutTitleItem.js");





var CommandIDs;
(function (CommandIDs) {
    CommandIDs.showSelectors = 'shortcutui:showSelectors';
    CommandIDs.resetAll = 'shortcutui:resetAll';
})(CommandIDs || (CommandIDs = {}));
class Symbols extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    getRegularSymbols() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsStyle },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Cmd \u2318"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Alt \u2325"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Ctrl \u2303"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Shift \u21E7"))));
    }
    getSmallSymbols() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsStyle, _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsSmallStyle) },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Cmd "),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.commandIconStyle }, "\u2318"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Alt "),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.altIconStyle }, "\u2325")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Ctrl "),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.controlIconStyle }, "\u2303"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Shift "),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u21E7"))));
    }
    getTinySymbols() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsStyle, _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsSmallStyle) },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Cmd"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u2318")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Alt"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u2325")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Ctrl"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u2303")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SymbolsRowStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Shift"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u21E7"))));
    }
    render() {
        switch (this.props.size) {
            case 0 /* Regular */:
                return this.getRegularSymbols();
            case 1 /* Small */:
                return this.getSmallSymbols();
            case 2 /* Tiny */:
                return this.getTinySymbols();
        }
    }
}
class AdvancedOptions extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        const trans = this.props.translator.load('jupyterlab');
        if (this.props.size === 0 /* Regular */) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsContainerStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsStyle },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { className: (0,_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsLinkStyle)(this.props.size), onClick: () => this.props.toggleSelectors() }, this.props.showSelectors
                        ? trans.__('Hide Selectors')
                        : trans.__('Show Selectors')),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)((0,_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsLinkStyle)(this.props.size)), onClick: () => this.props.resetShortcuts() }, trans.__('Reset All')))));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsStyle, _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsSmallStyle) },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { className: (0,_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsLinkStyle)(this.props.size), onClick: () => this.props.toggleSelectors() }, this.props.showSelectors
                    ? trans.__('Hide Selectors')
                    : trans.__('Show Selectors')),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)((0,_componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsLinkStyle)(this.props.size)), onClick: () => this.props.resetShortcuts() }, trans.__('Reset All'))));
        }
    }
}
/** React component for top navigation */
class TopNav extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.getSize = (width) => {
            if (width < 730) {
                return 2 /* Tiny */;
            }
            else if (width < 1260) {
                return 1 /* Small */;
            }
            else {
                return 0 /* Regular */;
            }
        };
        this.addMenuCommands();
        this.menu = this.props.external.createMenu();
        this.menu.addItem({ command: CommandIDs.showSelectors });
        this.menu.addItem({ command: CommandIDs.resetAll });
    }
    addMenuCommands() {
        const trans = this.props.external.translator.load('jupyterlab');
        if (!this.props.external.hasCommand(CommandIDs.showSelectors)) {
            this.props.external.addCommand(CommandIDs.showSelectors, {
                label: trans.__('Toggle Selectors'),
                caption: trans.__('Toggle command selectors'),
                execute: () => {
                    this.props.toggleSelectors();
                }
            });
        }
        if (!this.props.external.hasCommand(CommandIDs.resetAll)) {
            this.props.external.addCommand(CommandIDs.resetAll, {
                label: trans.__('Reset All'),
                caption: trans.__('Reset all shortcuts'),
                execute: () => {
                    this.props.resetShortcuts();
                }
            });
        }
    }
    getShortCutTitleItem(title) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ShortcutTitleItem__WEBPACK_IMPORTED_MODULE_4__.ShortcutTitleItem, { title: title, updateSort: this.props.updateSort, active: this.props.currentSort })));
    }
    render() {
        const trans = this.props.external.translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.TopStyle },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.TopNavStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(Symbols, { size: this.getSize(this.props.width) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SearchContainerStyle },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { onChange: event => this.props.updateSearchQuery(event), className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.SearchStyle, placeholder: trans.__('Search') })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(AdvancedOptions, { size: this.getSize(this.props.width), toggleSelectors: this.props.toggleSelectors, showSelectors: this.props.showSelectors, resetShortcuts: this.props.resetShortcuts, menu: this.menu, translator: this.props.external.translator })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.HeaderRowContainerStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_TopNavStyle__WEBPACK_IMPORTED_MODULE_2__.HeaderRowStyle },
                    this.getShortCutTitleItem(trans.__('Category')),
                    this.getShortCutTitleItem(trans.__('Command')),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _componentStyle_ShortcutItemStyle__WEBPACK_IMPORTED_MODULE_3__.CellStyle },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "title-div" }, trans.__('Shortcut'))),
                    this.getShortCutTitleItem(trans.__('Source')),
                    this.props.showSelectors &&
                        this.getShortCutTitleItem(trans.__('Selectors'))))));
    }
}
//# sourceMappingURL=TopNav.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/index.js":
/*!*******************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands?8e96");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./renderer */ "../../packages/shortcuts-extension/lib/renderer.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module shortcuts-extension
 */









function getExternalForJupyterLab(settingRegistry, app, translator) {
    const { commands } = app;
    const shortcutPluginLocation = '@jupyterlab/shortcuts-extension:shortcuts';
    return {
        translator,
        getAllShortCutSettings: () => settingRegistry.reload(shortcutPluginLocation),
        removeShortCut: (key) => settingRegistry.remove(shortcutPluginLocation, key),
        createMenu: () => new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Menu({ commands }),
        hasCommand: (id) => commands.hasCommand(id),
        addCommand: (id, options) => commands.addCommand(id, options),
        getLabel: (id) => commands.label(id)
    };
}
/**
 * The default shortcuts extension.
 *
 * #### Notes
 * Shortcut values are stored in the setting system. The default values for each
 * shortcut are preset in the settings schema file of this extension.
 * Additionally, each shortcut can be individually set by the end user by
 * modifying its setting (either in the text editor or by modifying its
 * underlying JSON schema file).
 *
 * When setting shortcut selectors, there are two concepts to consider:
 * specificity and matchability. These two interact in sometimes
 * counterintuitive ways. Keyboard events are triggered from an element and
 * they propagate up the DOM until they reach the `documentElement` (`<body>`).
 *
 * When a registered shortcut sequence is fired, the shortcut manager checks
 * the node that fired the event and each of its ancestors until a node matches
 * one or more registered selectors. The *first* matching selector in the
 * chain of ancestors will invoke the shortcut handler and the traversal will
 * end at that point. If a node matches more than one selector, the handler for
 * whichever selector is more *specific* fires.
 * @see https://www.w3.org/TR/css3-selectors/#specificity
 *
 * The practical consequence of this is that a very broadly matching selector,
 * e.g. `'*'` or `'div'` may match and therefore invoke a handler *before* a
 * more specific selector. The most common pitfall is to use the universal
 * (`'*'`) selector. For almost any use case where a global keyboard shortcut is
 * required, using the `'body'` selector is more appropriate.
 */
const shortcuts = {
    id: '@jupyterlab/shortcuts-extension:shortcuts',
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry],
    optional: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.ITranslator, _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.IFormComponentRegistry],
    activate: async (app, registry, translator, editorRegistry) => {
        const translator_ = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator_.load('jupyterlab');
        const { commands } = app;
        let canonical;
        let loaded = {};
        if (editorRegistry) {
            editorRegistry.addRenderer('shortcuts', (props) => {
                return (0,_renderer__WEBPACK_IMPORTED_MODULE_8__.renderShortCut)(Object.assign({ external: getExternalForJupyterLab(registry, app, translator_) }, props));
            });
        }
        /**
         * Populate the plugin's schema defaults.
         */
        function populate(schema) {
            const commands = app.commands.listCommands().join('\n');
            loaded = {};
            schema.properties.shortcuts.default = Object.keys(registry.plugins)
                .map(plugin => {
                const shortcuts = registry.plugins[plugin].schema['jupyter.lab.shortcuts'] || [];
                loaded[plugin] = shortcuts;
                return shortcuts;
            })
                .concat([schema.properties.shortcuts.default])
                .reduce((acc, val) => {
                if (_lumino_domutils__WEBPACK_IMPORTED_MODULE_6__.Platform.IS_MAC) {
                    return acc.concat(val);
                }
                else {
                    // If platform is not MacOS, remove all shortcuts containing Cmd
                    // as they will be modified; e.g. `Cmd A` becomes `A`
                    return acc.concat(val.filter(shortcut => !shortcut.keys.some(key => {
                        const { cmd } = _lumino_commands__WEBPACK_IMPORTED_MODULE_3__.CommandRegistry.parseKeystroke(key);
                        return cmd;
                    })));
                }
            }, []) // flatten one level
                .sort((a, b) => a.command.localeCompare(b.command));
            schema.properties.shortcuts.description = trans.__(`Note: To disable a system default shortcut,
copy it to User Preferences and add the
"disabled" key, for example:
{
    "command": "application:activate-next-tab",
    "keys": [
        "Ctrl Shift ]"
    ],
    "selector": "body",
    "disabled": true
}

List of commands followed by keyboard shortcuts:
%1

List of keyboard shortcuts:`, commands);
        }
        registry.pluginChanged.connect(async (sender, plugin) => {
            if (plugin !== shortcuts.id) {
                // If the plugin changed its shortcuts, reload everything.
                const oldShortcuts = loaded[plugin];
                const newShortcuts = registry.plugins[plugin].schema['jupyter.lab.shortcuts'] || [];
                if (oldShortcuts === undefined ||
                    !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepEqual(oldShortcuts, newShortcuts)) {
                    canonical = null;
                    await registry.reload(shortcuts.id);
                }
            }
        });
        // Transform the plugin object to return different schema than the default.
        registry.transform(shortcuts.id, {
            compose: plugin => {
                var _a, _b, _c, _d;
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                const defaults = (_c = (_b = (_a = canonical.properties) === null || _a === void 0 ? void 0 : _a.shortcuts) === null || _b === void 0 ? void 0 : _b.default) !== null && _c !== void 0 ? _c : [];
                const user = {
                    shortcuts: (_d = plugin.data.user.shortcuts) !== null && _d !== void 0 ? _d : []
                };
                const composite = {
                    shortcuts: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.SettingRegistry.reconcileShortcuts(defaults, user.shortcuts)
                };
                plugin.data = { composite, user };
                return plugin;
            },
            fetch: plugin => {
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                return {
                    data: plugin.data,
                    id: plugin.id,
                    raw: plugin.raw,
                    schema: canonical,
                    version: plugin.version
                };
            }
        });
        try {
            // Repopulate the canonical variable after the setting registry has
            // preloaded all initial plugins.
            canonical = null;
            const settings = await registry.load(shortcuts.id);
            Private.loadShortcuts(commands, settings.composite);
            settings.changed.connect(() => {
                Private.loadShortcuts(commands, settings.composite);
            });
        }
        catch (error) {
            console.error(`Loading ${shortcuts.id} failed.`, error);
        }
    },
    autoStart: true
};
/**
 * Export the shortcut plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shortcuts);
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * The internal collection of currently loaded shortcuts.
     */
    let disposables;
    /**
     * Load the keyboard shortcuts from settings.
     */
    function loadShortcuts(commands, composite) {
        var _a;
        const shortcuts = ((_a = composite === null || composite === void 0 ? void 0 : composite.shortcuts) !== null && _a !== void 0 ? _a : []);
        if (disposables) {
            disposables.dispose();
        }
        disposables = shortcuts.reduce((acc, val) => {
            const options = normalizeOptions(val);
            if (options) {
                acc.add(commands.addKeyBinding(options));
            }
            return acc;
        }, new _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__.DisposableSet());
    }
    Private.loadShortcuts = loadShortcuts;
    /**
     * Normalize potential keyboard shortcut options.
     */
    function normalizeOptions(value) {
        if (!value || typeof value !== 'object') {
            return undefined;
        }
        const { isArray } = Array;
        const valid = 'command' in value &&
            'keys' in value &&
            'selector' in value &&
            isArray(value.keys);
        return valid ? value : undefined;
    }
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/shortcuts-extension/lib/renderer.js":
/*!**********************************************************!*\
  !*** ../../packages/shortcuts-extension/lib/renderer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderShortCut": () => (/* binding */ renderShortCut)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "../../packages/shortcuts-extension/lib/components/ShortcutUI.js");


const renderShortCut = (props) => {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.ShortcutUI, { external: props.external, height: 1000, width: 1000 });
};
//# sourceMappingURL=renderer.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hvcnRjdXRzLWV4dGVuc2lvbi9saWIvY29tcG9uZW50U3R5bGUvU2hvcnRjdXRJbnB1dFN0eWxlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zaG9ydGN1dHMtZXh0ZW5zaW9uL2xpYi9jb21wb25lbnRTdHlsZS9TaG9ydGN1dEl0ZW1TdHlsZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hvcnRjdXRzLWV4dGVuc2lvbi9saWIvY29tcG9uZW50U3R5bGUvU2hvcnRjdXRMaXN0U3R5bGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Nob3J0Y3V0cy1leHRlbnNpb24vbGliL2NvbXBvbmVudFN0eWxlL1Nob3J0Y3V0VGl0bGVJdGVtU3R5bGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Nob3J0Y3V0cy1leHRlbnNpb24vbGliL2NvbXBvbmVudFN0eWxlL1Nob3J0Y3V0VUlTdHlsZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hvcnRjdXRzLWV4dGVuc2lvbi9saWIvY29tcG9uZW50U3R5bGUvVG9wTmF2U3R5bGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Nob3J0Y3V0cy1leHRlbnNpb24vbGliL2NvbXBvbmVudHMvU2hvcnRjdXRJbnB1dC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hvcnRjdXRzLWV4dGVuc2lvbi9saWIvY29tcG9uZW50cy9TaG9ydGN1dEl0ZW0uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Nob3J0Y3V0cy1leHRlbnNpb24vbGliL2NvbXBvbmVudHMvU2hvcnRjdXRMaXN0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zaG9ydGN1dHMtZXh0ZW5zaW9uL2xpYi9jb21wb25lbnRzL1Nob3J0Y3V0VGl0bGVJdGVtLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zaG9ydGN1dHMtZXh0ZW5zaW9uL2xpYi9jb21wb25lbnRzL1Nob3J0Y3V0VUkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Nob3J0Y3V0cy1leHRlbnNpb24vbGliL2NvbXBvbmVudHMvVG9wTmF2LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zaG9ydGN1dHMtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hvcnRjdXRzLWV4dGVuc2lvbi9saWIvcmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE2QztBQUN0QyxzQkFBc0IsZ0RBQUs7QUFDbEM7QUFDQTtBQUNBLENBQUM7QUFDTSx5QkFBeUIsZ0RBQUs7QUFDckM7QUFDQSxDQUFDO0FBQ00sNEJBQTRCLGdEQUFLO0FBQ3hDO0FBQ0EsQ0FBQztBQUNELHVCQUF1QixvREFBUztBQUNoQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ00sbUJBQW1CLGdEQUFLO0FBQy9CO0FBQ0E7QUFDQTtBQUNB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Q2I7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtEQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxxQ0FBcUMsYUFBYTtBQUNsRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSw2REFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hPMEI7QUFDZ0I7QUFDbkM7QUFDUCxXQUFXLDBEQUFtQixDQUFDLG1EQUFVLEdBQUcsc0RBQXNEO0FBQ2xHO0FBQ0Esb0MiLCJmaWxlIjoicGFja2FnZXNfc2hvcnRjdXRzLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuZGRmODUwZDA4YWQ3OTAxYTY2MDQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBrZXlmcmFtZXMsIHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlJztcbmV4cG9ydCBjb25zdCBJbnB1dEJveFN0eWxlID0gc3R5bGUoe1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgcGFkZGluZ1RvcDogJzJweCdcbn0pO1xuZXhwb3J0IGNvbnN0IElucHV0Qm94TmV3U3R5bGUgPSBzdHlsZSh7XG4gICAgbWFyZ2luTGVmdDogJzEwcHgnXG59KTtcbmV4cG9ydCBjb25zdCBJbnB1dEJveEhpZGRlblN0eWxlID0gc3R5bGUoe1xuICAgIGRpc3BsYXk6ICdoaWRkZW4nXG59KTtcbmNvbnN0IHNsaWRlQW5pbWF0aW9uID0ga2V5ZnJhbWVzKHtcbiAgICBmcm9tOiB7XG4gICAgICAgIHdpZHRoOiAnMCcsXG4gICAgICAgIGxlZnQ6ICcwJ1xuICAgIH0sXG4gICAgdG86IHtcbiAgICAgICAgd2lkdGg6ICcxMjBweCcsXG4gICAgICAgIGxlZnQ6ICcwJ1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IElucHV0U3R5bGUgPSBzdHlsZSh7XG4gICAgYW5pbWF0aW9uRHVyYXRpb246ICcwLjVzJyxcbiAgICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2Vhc2Utb3V0JyxcbiAgICBhbmltYXRpb25OYW1lOiBzbGlkZUFuaW1hdGlvbixcbiAgICBib3JkZXJXaWR0aDogJ3ZhcigtLWpwLWJvcmRlci13aWR0aCknLFxuICAgIGJvcmRlckNvbG9yOiAndmFyKC0tanAtYm9yZGVyLWNvbG9yMyknLFxuICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjApJyxcbiAgICBtYXJnaW5MZWZ0OiAnYXV0bycsXG4gICAgcGFkZGluZ0xlZnQ6ICcxMHB4JyxcbiAgICB3aWR0aDogJzEyMHB4JyxcbiAgICBoZWlnaHQ6ICcyNXB4JyxcbiAgICBsaW5lSGVpZ2h0OiAnMjVweCcsXG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJjpmb2N1cyc6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tanAtY29udGVudC1mb250LWNvbG9yMSknLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjIpJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgSW5wdXRVbmF2YWlsYWJsZVN0eWxlID0gc3R5bGUoe1xuICAgICRuZXN0OiB7XG4gICAgICAgICcmOmZvY3VzJzoge1xuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1qcC1lcnJvci1jb2xvcjIpJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgSW5wdXRUZXh0U3R5bGUgPSBzdHlsZSh7XG4gICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICBvdmVyZmxvd1k6ICdoaWRkZW4nLFxuICAgIG1hcmdpbjogJzAnLFxuICAgIG1hcmdpblRvcDogJzRweCcsXG4gICAgcGFkZGluZzogJzAgNXB4JyxcbiAgICBoZWlnaHQ6ICcxN3B4JyxcbiAgICBsaW5lSGVpZ2h0OiAnMTdweCcsXG4gICAgd2lkdGg6ICdmaXQtY29udGVudCdcbn0pO1xuZXhwb3J0IGNvbnN0IElucHV0U2VsZWN0ZWRUZXh0U3R5bGUgPSBzdHlsZSh7XG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IzKScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG59KTtcbmV4cG9ydCBjb25zdCBJbnB1dFdhaXRpbmdTdHlsZSA9IHN0eWxlKHtcbiAgICBjb2xvcjogJ3ZhcigtLWpwLWNvbnRlbnQtZm9udC1jb2xvcjMpJ1xufSk7XG5leHBvcnQgY29uc3QgU3VibWl0U3R5bGUgPSBzdHlsZSh7XG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWpwLWJyYW5kLWNvbG9yMSknLFxuICAgIGJvcmRlclJhZGl1czogJzBweCcsXG4gICAgYm9yZGVyOiAnbm9uZScsXG4gICAgY29sb3I6ICd2YXIoLS1qcC1sYXlvdXQtY29sb3IwKScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWpwLXVpLWZvbnQtZmFtaWx5KScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBoZWlnaHQ6ICcyN3B4JyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd2YXIoIC0tanAtaWNvbi1jaGVja21hcmstd2hpdGUgKScsXG4gICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXG4gICAgd2lkdGg6ICcyNnB4JyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJjpmb2N1cyc6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgU3VibWl0Tm9uRnVuY3Rpb25hbFN0eWxlID0gc3R5bGUoe1xuICAgIGJhY2tncm91bmRJbWFnZTogJ3ZhciggLS1qcC1pY29uLWNoZWNrbWFyay13aGl0ZSApJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMyknXG59KTtcbmV4cG9ydCBjb25zdCBTdWJtaXRDb25mbGljdFN0eWxlID0gc3R5bGUoe1xuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1qcC1lcnJvci1jb2xvcjEpJyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd2YXIoLS1qcC1pY29uLWVycm9yLXdoaXRlICknLFxuICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxuICAgIGJhY2tncm91bmRTaXplOiAnMjBweCcsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWDogJzJweCcsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogJzJweCcsXG4gICAgYm9yZGVyOiAnbm9uZSdcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2hvcnRjdXRJbnB1dFN0eWxlLmpzLm1hcCIsImltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlJztcbmV4cG9ydCBjb25zdCBDZWxsU3R5bGUgPSBzdHlsZSh7XG4gICAgcGFkZGluZzogJzZweCAxMnB4JyxcbiAgICBkaXNwbGF5OiAndGFibGUtY2VsbCcsXG4gICAgd2lkdGg6ICcyMCUnLFxuICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnXG59KTtcbmV4cG9ydCBjb25zdCBTaG9ydGN1dENlbGxTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgbWluV2lkdGg6ICcxMDBweCcsXG4gICAgZmxleFdyYXA6ICd3cmFwJ1xufSk7XG5leHBvcnQgY29uc3QgRW1wdHlTaG9ydGN1dENlbGxTdHlsZSA9IHN0eWxlKHtcbiAgICBoZWlnaHQ6ICczMnB4JyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJiAjYWRkLWxpbmsnOiB7fVxuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IFNpbmdsZVNob3J0Y3V0Q2VsbFN0eWxlID0gc3R5bGUoe30pO1xuZXhwb3J0IGNvbnN0IFJvd1N0eWxlID0gc3R5bGUoe1xuICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICd0YWJsZS1yb3cnLFxuICAgIGJvcmRlckJvdHRvbTogJ3NvbGlkJyxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogJ3ZhcigtLWpwLWJvcmRlci1jb2xvcjEpJyxcbiAgICBib3JkZXJCb3R0b21XaWR0aDogJ3ZhcigtLWpwLWJvcmRlci13aWR0aCknLFxuICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjApJyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJjpob3ZlciAjc2hvcnRjdXQta2V5cyc6IHtcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tanAtYm9yZGVyLWNvbG9yMSknLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjIpJ1xuICAgICAgICB9LFxuICAgICAgICAnJjpob3ZlciAjYWRkLWxpbmsnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgICcmOmhvdmVyICNvcic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZnVuY3Rpb24gZ2V0TWFyZ2luTGVmdChzaG93U2VsZWN0b3JzLCBlcnJvclNpemUpIHtcbiAgICBpZiAoZXJyb3JTaXplID09PSAwIC8qIFJlZ3VsYXIgKi8pIHtcbiAgICAgICAgcmV0dXJuIHNob3dTZWxlY3RvcnMgPyAnMjAlJyA6ICcyNSUnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcwJztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gQ29uZmxpY3RDb250YWluZXJTdHlsZShzaG93U2VsZWN0b3JzLCBlcnJvclNpemUpIHtcbiAgICByZXR1cm4gc3R5bGUoe1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhXcmFwOiAnd3JhcCcsXG4gICAgICAgIHBhZGRpbmc6ICc2cHggMTJweCcsXG4gICAgICAgIG1hcmdpbkxlZnQ6IGdldE1hcmdpbkxlZnQoc2hvd1NlbGVjdG9ycywgZXJyb3JTaXplKVxuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IEVycm9yTWVzc2FnZVN0eWxlID0gc3R5bGUoe1xuICAgIGNvbG9yOiAndmFyKC0tanAtZXJyb3ItY29sb3IxKScsXG4gICAgbWFyZ2luVG9wOiAnOXB4J1xufSk7XG5leHBvcnQgY29uc3QgRXJyb3JCdXR0b25TdHlsZSA9IHN0eWxlKHtcbiAgICBsaW5lSGVpZ2h0OiAnMzRweCcsXG4gICAgbWFyZ2luTGVmdDogJzEwcHgnLFxuICAgICRuZXN0OiB7XG4gICAgICAgICcmIGJ1dHRvbjpudGgtb2YtdHlwZSgxKSc6IHtcbiAgICAgICAgICAgIGhlaWdodDogJzI1cHgnLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc1cHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtYm9yZGVyLWNvbG9yMCknLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAkbmVzdDoge1xuICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge30sXG4gICAgICAgICAgICAgICAgJyY6YWN0aXZlJzoge1xuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnJmZvY3VzJzoge1xuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnJiBidXR0b246bnRoLW9mLXR5cGUoMiknOiB7XG4gICAgICAgICAgICBoZWlnaHQ6ICcyNXB4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWpwLWVycm9yLWNvbG9yMSknLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAkbmVzdDoge1xuICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge30sXG4gICAgICAgICAgICAgICAgJyY6YWN0aXZlJzoge1xuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnJmZvY3VzJzoge1xuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgU2hvcnRjdXRDb250YWluZXJTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJjpob3ZlciAjc2hvcnRjdXQta2V5cyc6IHtcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tanAtYm9yZGVyLWNvbG9yMyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjMpJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgU2hvcnRjdXRLZXlzQ29udGFpbmVyU3R5bGUgPSBzdHlsZSh7XG4gICAgZm9udFNpemU6ICd2YXIoLS1qcC1jb2RlLWZvbnQtc2l6ZSknLFxuICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1qcC11aS1mb250LWZhbWlseSknLFxuICAgIGRpc3BsYXk6ICdmbGV4J1xufSk7XG5leHBvcnQgY29uc3QgU2hvcnRjdXRLZXlzU3R5bGUgPSBzdHlsZSh7XG4gICAgYm9yZGVyV2lkdGg6ICd2YXIoLS1qcC1ib3JkZXItd2lkdGgpJyxcbiAgICBib3JkZXJDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjApJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMCknLFxuICAgIHBhZGRpbmc6ICc1cHggNnB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1qcC1ib3JkZXItcmFkaXVzKScsXG4gICAgbWFyZ2luOiAnM3B4IDAnXG59KTtcbmV4cG9ydCBjb25zdCBPclN0eWxlID0gc3R5bGUoe1xuICAgIG1hcmdpblJpZ2h0OiAnMTJweCcsXG4gICAgbWFyZ2luTGVmdDogJzEycHgnLFxuICAgIG1hcmdpblRvcDogJzhweCcsXG4gICAgY29sb3I6ICd2YXIoLS1qcC1jb250ZW50LWZvbnQtY29sb3IzKScsXG4gICAgZGlzcGxheTogJ25vbmUnLFxuICAgICRuZXN0OiB7XG4gICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgT3JUd29TdHlsZSA9IHN0eWxlKHtcbiAgICBtYXJnaW5SaWdodDogJzEycHgnLFxuICAgIG1hcmdpbkxlZnQ6ICcxMnB4JyxcbiAgICBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGNvbG9yOiAndmFyKC0tanAtY29udGVudC1mb250LWNvbG9yMyknLFxuICAgIGRpc3BsYXk6ICdibG9jaydcbn0pO1xuZXhwb3J0IGNvbnN0IENvbW1hU3R5bGUgPSBzdHlsZSh7XG4gICAgbWFyZ2luVG9wOiAnMTBweCcsXG4gICAgbWFyZ2luUmlnaHQ6ICcycHgnLFxuICAgIG1hcmdpbkxlZnQ6ICcycHgnXG59KTtcbmV4cG9ydCBjb25zdCBQbHVzU3R5bGUgPSBzdHlsZSh7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjMpJyxcbiAgICBib3JkZXJDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjApJyxcbiAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1qcC1ib3JkZXItcmFkaXVzKScsXG4gICAgYm9yZGVyV2lkdGg6ICd2YXIoLS1qcC1ib3JkZXItd2lkdGgpJyxcbiAgICBtYXJnaW46ICczcHggMCcsXG4gICAgcGFkZGluZzogJzVweCA2cHgnLFxuICAgICRuZXN0OiB7XG4gICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IyKSdcbiAgICAgICAgfSxcbiAgICAgICAgJyY6YWN0aXZlJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IyKSdcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IFJlc2V0U3R5bGUgPSBzdHlsZSh7XG4gICAgY29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjIpJyxcbiAgICBwYWRkaW5nTGVmdDogJzEwcHgnLFxuICAgICRuZXN0OiB7XG4gICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjEpJ1xuICAgICAgICB9XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgU291cmNlQ2VsbFN0eWxlID0gc3R5bGUoe1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNob3J0Y3V0SXRlbVN0eWxlLmpzLm1hcCIsImltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlJztcbmV4cG9ydCBjb25zdCBTaG9ydGN1dExpc3RTdHlsZSA9IHN0eWxlKHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICd0YWJsZScsXG4gICAgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZSdcbn0pO1xuZXhwb3J0IGZ1bmN0aW9uIFNob3J0Y3V0TGlzdENvbnRhaW5lclN0eWxlKHRvcE5hdkhlaWdodCwgd2lkZ2V0SGVpZ2h0KSB7XG4gICAgcmV0dXJuIHN0eWxlKHtcbiAgICAgICAgb3ZlcmZsb3dZOiAnc2Nyb2xsJyxcbiAgICAgICAgaGVpZ2h0OiB3aWRnZXRIZWlnaHQgLSB0b3BOYXZIZWlnaHQsXG4gICAgICAgIGJvcmRlclRvcDogJ3NvbGlkJyxcbiAgICAgICAgYm9yZGVyVG9wQ29sb3I6ICd2YXIoLS1qcC1ib3JkZXItY29sb3IxKScsXG4gICAgICAgIGJvcmRlclRvcFdpZHRoOiAndmFyKC0tanAtYm9yZGVyLXdpZHRoKSdcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNob3J0Y3V0TGlzdFN0eWxlLmpzLm1hcCIsImltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlJztcbmV4cG9ydCBjb25zdCBIZWFkZXJTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgJG5lc3Q6IHtcbiAgICAgICAgJyY6aG92ZXIgZGl2Jzoge1xuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC11aS1mb250LWNvbG9yMCknXG4gICAgICAgIH0sXG4gICAgICAgICcmOmZvY3VzIGRpdic6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnJjphY3RpdmUgZGl2Jzoge1xuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC11aS1mb250LWNvbG9yMCknXG4gICAgICAgIH1cbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBDdXJyZW50SGVhZGVyU3R5bGUgPSBzdHlsZSh7XG4gICAgJG5lc3Q6IHtcbiAgICAgICAgJyYgZGl2Jzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC11aS1mb250LWNvbG9yMCknLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXG4gICAgICAgIH1cbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBTb3J0QnV0dG9uU3R5bGUgPSBzdHlsZSh7XG4gICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknLFxuICAgIG1hcmdpbkxlZnQ6ICcxMHB4JyxcbiAgICBjb2xvcjogJ3ZhcigtLWpwLXVpLWZvbnQtY29sb3IyKScsXG4gICAgYm9yZGVyOiAnbm9uZScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMCknLFxuICAgIGZvbnRTaXplOiAndmFyKC0tanAtdWktZm9udC1zaXplMSknXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNob3J0Y3V0VGl0bGVJdGVtU3R5bGUuanMubWFwIiwiaW1wb3J0IHsgc3R5bGUgfSBmcm9tICd0eXBlc3R5bGUnO1xuZXhwb3J0IGNvbnN0IFRvcFdoaXRlc3BhY2VTdHlsZSA9IHN0eWxlKHtcbiAgICBjb250ZW50OiAnICcsXG4gICAgaGVpZ2h0OiAndmFyKC0tanAtdG9vbGJhci1taWNyby1oZWlnaHQpJyxcbiAgICBib3JkZXJCb3R0b206ICd2YXIoLS1qcC1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLWpwLXRvb2xiYXItYm9yZGVyLWNvbG9yKScsXG4gICAgYm94U2hhZG93OiAndmFyKC0tanAtdG9vbGJhci1ib3gtc2hhZG93KScsXG4gICAgekluZGV4OiAyLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWpwLXRvb2xiYXItYmFja2dyb3VuZCknLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG59KTtcbmV4cG9ydCBjb25zdCBTaG9ydGN1dFVJU3R5bGUgPSBzdHlsZSh7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGZvbnRTaXplOiAndmFyKC0tanAtdWktZm9udC1zaXplMSknLFxuICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1qcC11aS1mb250LWZhbWlseSknLFxuICAgIGNvbG9yOiAndmFyKC0tanAtY29udGVudC1mb250LWNvbG9yMSknLFxuICAgIG1pbldpZHRoOiAnNDUwcHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2hvcnRjdXRVSVN0eWxlLmpzLm1hcCIsImltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlJztcbmV4cG9ydCBjb25zdCBUb3BTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnYmxvY2snXG59KTtcbmV4cG9ydCBjb25zdCBUb3BOYXZTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgZm9udFNpemU6ICd2YXIoLS1qcC11aS1mb250LXNpemUxKScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMCknLFxuICAgIHpJbmRleDogMSxcbiAgICBoZWlnaHQ6ICc1NnB4J1xufSk7XG5leHBvcnQgY29uc3QgU3ltYm9sc1N0eWxlID0gc3R5bGUoe1xuICAgIHdpZHRoOiAnMTUlJyxcbiAgICBkaXNwbGF5OiAndGFibGUnLFxuICAgIHBhZGRpbmdMZWZ0OiAnMTJweCcsXG4gICAgbGluZUhlaWdodDogJzI0cHgnLFxuICAgIHBhZGRpbmdUb3A6ICc1cHgnXG59KTtcbmV4cG9ydCBjb25zdCBTeW1ib2xzU21hbGxTdHlsZSA9IHN0eWxlKHtcbiAgICBsaW5lSGVpZ2h0OiAnMTRweCdcbn0pO1xuZXhwb3J0IGNvbnN0IFN5bWJvbHNSb3dTdHlsZSA9IHN0eWxlKHtcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICBkaXNwbGF5OiAndGFibGUtcm93JyxcbiAgICAkbmVzdDoge1xuICAgICAgICAnJiBkaXYnOiB7XG4gICAgICAgICAgICBtYXJnaW46ICcwcHggMTBweCcsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWpwLXVpLWZvbnQtc2l6ZTEpJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICd0YWJsZS1jZWxsJ1xuICAgICAgICB9LFxuICAgICAgICAnJiBzcGFuJzoge1xuICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1qcC11aS1mb250LXNpemUxKSdcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IFNlYXJjaENvbnRhaW5lclN0eWxlID0gc3R5bGUoe1xuICAgIHdpZHRoOiAnNjAlJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG59KTtcbmV4cG9ydCBjb25zdCBTZWFyY2hTdHlsZSA9IHN0eWxlKHtcbiAgICBib3JkZXJXaWR0aDogJ3ZhcigtLWpwLWJvcmRlci13aWR0aCknLFxuICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlckNvbG9yOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMyknLFxuICAgIGhlaWdodDogJzMwcHgnLFxuICAgIHdpZHRoOiAnNjUlJyxcbiAgICBmb250U2l6ZTogJ3ZhcigtLWpwLXVpLWZvbnQtc2l6ZTEpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWpwLXVpLWZvbnQtY29sb3IwKScsXG4gICAgcGFkZGluZ0xlZnQ6ICc2cHgnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjEpJyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd2YXIoLS1qcC1pY29uLXNlYXJjaCknLFxuICAgIGJhY2tncm91bmRTaXplOiAnMThweCcsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogJzZweCcsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWDogJzk4JScsXG4gICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXG4gICAgbWFyZ2luVG9wOiAnOHB4JyxcbiAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgJG5lc3Q6IHtcbiAgICAgICAgJyY6Zm9jdXMnOiB7XG4gICAgICAgICAgICBib3JkZXI6ICd2YXIoLS1qcC1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLW1kLWJsdWUtNTAwKScsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDAgNHB4IHZhcigtLW1kLWJsdWUtMzAwKSdcbiAgICAgICAgfSxcbiAgICAgICAgJyY6OnBsYWNlaG9sZGVyJzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC11aS1mb250LWNvbG9yMiknXG4gICAgICAgIH1cbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBBZHZhbmNlZE9wdGlvbnNDb250YWluZXJTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnY29udGVudHMnXG59KTtcbmV4cG9ydCBjb25zdCBBZHZhbmNlZE9wdGlvbnNTdHlsZSA9IHN0eWxlKHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIHBhZGRpbmdUb3A6ICc1cHgnXG59KTtcbmV4cG9ydCBjb25zdCBBZHZhbmNlZE9wdGlvbnNTbWFsbFN0eWxlID0gc3R5bGUoe1xuICAgIHdpZHRoOiAnMzAlJ1xufSk7XG5leHBvcnQgY29uc3QgQWR2YW5jZWRPcHRpb25zUmlnaHRTdHlsZSA9IHN0eWxlKHtcbiAgICBtYXJnaW5Ub3A6ICc4cHgnXG59KTtcbmV4cG9ydCBmdW5jdGlvbiBBZHZhbmNlZE9wdGlvbnNMaW5rU3R5bGUoc2l6ZSkge1xuICAgIGlmIChzaXplID09PSAwIC8qIFJlZ3VsYXIgKi8pIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlKHtcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IyKScsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxNXB4JyxcbiAgICAgICAgICAgICRuZXN0OiB7XG4gICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IxKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcmOmFjdGl2ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjApJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3R5bGUoe1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjIpJyxcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICRuZXN0OiB7XG4gICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IxKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcmOmFjdGl2ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1qcC1icmFuZC1jb2xvcjApJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEhlYWRlclJvd0NvbnRhaW5lclN0eWxlID0gc3R5bGUoe1xuICAgIHBhZGRpbmdSaWdodDogJzE0cHgnXG59KTtcbmV4cG9ydCBjb25zdCBIZWFkZXJSb3dTdHlsZSA9IHN0eWxlKHtcbiAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgZm9udFNpemU6ICd2YXIoLS1qcC11aS1mb250LXNpemUxKScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtbGF5b3V0LWNvbG9yMCknLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgekluZGV4OiAxLFxuICAgIGRpc3BsYXk6ICd0YWJsZScsXG4gICAgcGFkZGluZzogJzEwcHggMCdcbn0pO1xuZXhwb3J0IGNvbnN0IGNvbW1hbmRJY29uU3R5bGUgPSBzdHlsZSh7XG4gICAgbWFyZ2luUmlnaHQ6ICcxM3B4J1xufSk7XG5leHBvcnQgY29uc3QgYWx0SWNvblN0eWxlID0gc3R5bGUoe1xuICAgIG1hcmdpbkxlZnQ6ICcxNHB4J1xufSk7XG5leHBvcnQgY29uc3QgY29udHJvbEljb25TdHlsZSA9IHN0eWxlKHtcbiAgICBtYXJnaW5MZWZ0OiAnOHB4JyxcbiAgICBtYXJnaW5SaWdodDogJzE2cHgnXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRvcE5hdlN0eWxlLmpzLm1hcCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNsYXNzZXMgfSBmcm9tICd0eXBlc3R5bGUnO1xuaW1wb3J0IHsgRU5fVVMgfSBmcm9tICdAbHVtaW5vL2tleWJvYXJkJztcbmltcG9ydCB7IElucHV0Qm94SGlkZGVuU3R5bGUsIElucHV0Qm94TmV3U3R5bGUsIElucHV0Qm94U3R5bGUsIElucHV0U2VsZWN0ZWRUZXh0U3R5bGUsIElucHV0U3R5bGUsIElucHV0VGV4dFN0eWxlLCBJbnB1dFVuYXZhaWxhYmxlU3R5bGUsIElucHV0V2FpdGluZ1N0eWxlLCBTdWJtaXRDb25mbGljdFN0eWxlLCBTdWJtaXROb25GdW5jdGlvbmFsU3R5bGUsIFN1Ym1pdFN0eWxlIH0gZnJvbSAnLi4vY29tcG9uZW50U3R5bGUvU2hvcnRjdXRJbnB1dFN0eWxlJztcbi8qKiBPYmplY3QgZm9yIHNob3J0Y3V0IGl0ZW1zICovXG5leHBvcnQgY2xhc3MgU2hvcnRjdXRPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbW1hbmROYW1lID0gJyc7XG4gICAgICAgIHRoaXMubGFiZWwgPSAnJztcbiAgICAgICAgdGhpcy5rZXlzID0ge307XG4gICAgICAgIHRoaXMuc291cmNlID0gJyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnJztcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9ICcnO1xuICAgICAgICB0aGlzLmlkID0gJyc7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZTaG9ydGN1dHMgPSAwO1xuICAgICAgICB0aGlzLmhhc0NvbmZsaWN0ID0gZmFsc2U7XG4gICAgfVxuICAgIGdldChzb3J0Q3JpdGVyaWEpIHtcbiAgICAgICAgaWYgKHNvcnRDcml0ZXJpYSA9PT0gJ2xhYmVsJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc29ydENyaXRlcmlhID09PSAnc2VsZWN0b3InKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzb3J0Q3JpdGVyaWEgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNvcnRDcml0ZXJpYSA9PT0gJ3NvdXJjZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKiBPYmplY3QgZm9yIGNvbmZsaWN0aW5nIHNob3J0Y3V0IGVycm9yIG1lc3NhZ2VzICovXG5leHBvcnQgY2xhc3MgRXJyb3JPYmplY3QgZXh0ZW5kcyBTaG9ydGN1dE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGFrZW5CeSA9IG5ldyBUYWtlbkJ5T2JqZWN0KCk7XG4gICAgfVxufVxuLyoqIE9iamVjdCBmb3Igc2hvd2luZyB3aGljaCBzaG9ydGN1dCBjb25mbGljdHMgd2l0aCB0aGUgbmV3IG9uZSAqL1xuZXhwb3J0IGNsYXNzIFRha2VuQnlPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHNob3J0Y3V0KSB7XG4gICAgICAgIGlmIChzaG9ydGN1dCkge1xuICAgICAgICAgICAgdGhpcy50YWtlbkJ5ID0gc2hvcnRjdXQ7XG4gICAgICAgICAgICB0aGlzLnRha2VuQnlLZXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMudGFrZW5CeUxhYmVsID0gc2hvcnRjdXQuY2F0ZWdvcnkgKyAnOiAnICsgc2hvcnRjdXQubGFiZWw7XG4gICAgICAgICAgICB0aGlzLmlkID0gc2hvcnRjdXQuY29tbWFuZE5hbWUgKyAnXycgKyBzaG9ydGN1dC5zZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFrZW5CeSA9IG5ldyBTaG9ydGN1dE9iamVjdCgpO1xuICAgICAgICAgICAgdGhpcy50YWtlbkJ5S2V5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnRha2VuQnlMYWJlbCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5pZCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5cyA9IHRoaXMuc3RhdGUua2V5cztcbiAgICAgICAgICAgIGtleXMucHVzaCh0aGlzLnN0YXRlLmN1cnJlbnRDaGFpbik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsga2V5czoga2V5cyB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlVXBkYXRlKHRoaXMucHJvcHMuc2hvcnRjdXQsIHRoaXMuc3RhdGUua2V5cyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlT3ZlcndyaXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wc1xuICAgICAgICAgICAgICAgIC5kZWxldGVTaG9ydGN1dCh0aGlzLnN0YXRlLnRha2VuQnlPYmplY3QudGFrZW5CeSwgdGhpcy5zdGF0ZS50YWtlbkJ5T2JqZWN0LnRha2VuQnlLZXkpXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVVcGRhdGUoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlUmVwbGFjZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXlzID0gdGhpcy5zdGF0ZS5rZXlzO1xuICAgICAgICAgICAga2V5cy5wdXNoKHRoaXMuc3RhdGUuY3VycmVudENoYWluKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlSW5wdXQoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJvcHMuZGVsZXRlU2hvcnRjdXQodGhpcy5wcm9wcy5zaG9ydGN1dCwgdGhpcy5wcm9wcy5zaG9ydGN1dElkKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlVXBkYXRlKHRoaXMucHJvcHMuc2hvcnRjdXQsIGtleXMpO1xuICAgICAgICB9O1xuICAgICAgICAvKiogUGFyc2UgdXNlciBpbnB1dCBmb3IgY2hhaW5lZCBzaG9ydGN1dHMgKi9cbiAgICAgICAgdGhpcy5wYXJzZUNoYWluaW5nID0gKGV2ZW50LCB2YWx1ZSwgdXNlcklucHV0LCBrZXlzLCBjdXJyZW50Q2hhaW4pID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBFTl9VUy5rZXlGb3JLZXlkb3duRXZlbnQoZXZlbnQubmF0aXZlRXZlbnQpO1xuICAgICAgICAgICAgY29uc3QgbW9kS2V5cyA9IFsnU2hpZnQnLCAnQ29udHJvbCcsICdBbHQnLCAnTWV0YScsICdDdHJsJywgJ0FjY2VsJ107XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnQmFja3NwYWNlJykge1xuICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICcnO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAga2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dDogdXNlcklucHV0LFxuICAgICAgICAgICAgICAgICAgICBrZXlzOiBrZXlzLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW46IGN1cnJlbnRDaGFpblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ICE9PSAnQ2Fwc0xvY2snKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdEtleSA9IHVzZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyKHVzZXJJbnB1dC5sYXN0SW5kZXhPZignICcpICsgMSwgdXNlcklucHV0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAvKiogaWYgbGFzdCBrZXkgd2FzIG5vdCBhIG1vZGVmaWVyIHRoZW4gdGhlcmUgaXMgYSBjaGFpbiAqL1xuICAgICAgICAgICAgICAgIGlmIChtb2RLZXlzLmxhc3RJbmRleE9mKGxhc3RLZXkpID09PSAtMSAmJiBsYXN0S2V5ICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9IHVzZXJJbnB1dCArICcsJztcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRDaGFpbik7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAvKiogY2hlY2sgaWYgYSBtb2RlZmllciBrZXkgd2FzIGhlbGQgZG93biB0aHJvdWdoIGNoYWluICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleSAhPSAnQ29udHJvbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIEN0cmwnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyBDdHJsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5ICYmIGV2ZW50LmtleSAhPSAnTWV0YScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIEFjY2VsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENoYWluID0gKGN1cnJlbnRDaGFpbiArICcgQWNjZWwnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXkgIT0gJ0FsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIEFsdCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnIEFsdCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ICE9ICdTaGlmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIFNoaWZ0JykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENoYWluID0gKGN1cnJlbnRDaGFpbiArICcgU2hpZnQnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqIGlmIG5vdCBhIG1vZGVmaWVyIGtleSwgYWRkIHRvIHVzZXIgaW5wdXQgYW5kIGN1cnJlbnQgY2hhaW4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZEtleXMubGFzdEluZGV4T2YoZXZlbnQua2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnICcgKyBrZXkpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnICcgKyBrZXkpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBpZiBhIG1vZGVmaWVyIGtleSwgYWRkIHRvIHVzZXIgaW5wdXQgYW5kIGN1cnJlbnQgY2hhaW4gKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdNZXRhJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIEFjY2VsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnIEFjY2VsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQ29udHJvbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyBDdHJsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnIEN0cmwnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09ICdTaGlmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyBTaGlmdCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyBTaGlmdCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0FsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyBBbHQnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENoYWluID0gKGN1cnJlbnRDaGFpbiArICcgQWx0JykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklucHV0ID0gKHVzZXJJbnB1dCArICcgJyArIGV2ZW50LmtleSkudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnICcgKyBldmVudC5rZXkpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKiogaWYgbm90IGEgY2hhaW4sIGFkZCB0aGUga2V5IHRvIHVzZXIgaW5wdXQgYW5kIGN1cnJlbnQgY2hhaW4gKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKiBpZiBtb2RlZmllciBrZXksIHJlbmFtZSAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnQ29udHJvbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dCA9ICh1c2VySW5wdXQgKyAnIEN0cmwnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyBDdHJsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ01ldGEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyBBY2NlbCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiA9IChjdXJyZW50Q2hhaW4gKyAnIEFjY2VsJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ1NoaWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklucHV0ID0gKHVzZXJJbnB1dCArICcgU2hpZnQnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyBTaGlmdCcpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBbHQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyBBbHQnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyBBbHQnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogaWYgbm90IGEgbW9kZWZpZXIga2V5LCBhZGQgaXQgcmVndWxhcmx5ICovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQgPSAodXNlcklucHV0ICsgJyAnICsga2V5KS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW4gPSAoY3VycmVudENoYWluICsgJyAnICsga2V5KS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiogdXBkYXRlIHN0YXRlIG9mIGtleXMgYW5kIGN1cnJlbnRDaGFpbiAqL1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW46IGN1cnJlbnRDaGFpblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gW3VzZXJJbnB1dCwga2V5cywgY3VycmVudENoYWluXTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHNob3JjdXQgYmVpbmcgdHlwZWQgd2lsbCB3b3JrXG4gICAgICAgICAqIChkb2VzIG5vdCBlbmQgd2l0aCBjdHJsLCBhbHQsIGNvbW1hbmQsIG9yIHNoaWZ0KVxuICAgICAgICAgKiAqL1xuICAgICAgICB0aGlzLmNoZWNrTm9uRnVuY3Rpb25hbCA9IChzaG9ydGN1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9udEVuZCA9IFsnQ3RybCcsICdBbHQnLCAnQWNjZWwnLCAnU2hpZnQnXTtcbiAgICAgICAgICAgIGNvbnN0IHNob3J0Y3V0S2V5cyA9IHRoaXMuc3RhdGUuY3VycmVudENoYWluLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gc2hvcnRjdXRLZXlzW3Nob3J0Y3V0S2V5cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlzRnVuY3Rpb25hbDogIShkb250RW5kLmluZGV4T2YobGFzdCkgIT09IC0xKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZG9udEVuZC5pbmRleE9mKGxhc3QpICE9PSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqIENoZWNrIGlmIHNob3J0Y3V0IGJlaW5nIHR5cGVkIGlzIGFscmVhZHkgdGFrZW4gKi9cbiAgICAgICAgdGhpcy5jaGVja1Nob3J0Y3V0QXZhaWxhYmlsaXR5ID0gKHVzZXJJbnB1dCwga2V5cywgY3VycmVudENoYWluKSA9PiB7XG4gICAgICAgICAgICAvKiogRmlyc3QsIGNoZWNrIHdob2xlIHNob3J0Y3V0ICovXG4gICAgICAgICAgICBsZXQgaXNBdmFpbGFibGUgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmtleUJpbmRpbmdzVXNlZCkuaW5kZXhPZihrZXlzLmpvaW4oJyAnKSArIGN1cnJlbnRDaGFpbiArICdfJyArIHRoaXMucHJvcHMuc2hvcnRjdXQuc2VsZWN0b3IpID09PSAtMSB8fCB1c2VySW5wdXQgPT09ICcnO1xuICAgICAgICAgICAgbGV0IHRha2VuQnlPYmplY3QgPSBuZXcgVGFrZW5CeU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKGlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgLyoqIE5leHQsIGNoZWNrIGVhY2ggcGllY2Ugb2YgYSBjaGFpbiAqL1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGJpbmRpbmcgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5wcm9wcy5rZXlCaW5kaW5nc1VzZWQpLmluZGV4T2YoYmluZGluZyArICdfJyArIHRoaXMucHJvcHMuc2hvcnRjdXQuc2VsZWN0b3IpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlbkJ5T2JqZWN0ID0gdGhpcy5wcm9wcy5rZXlCaW5kaW5nc1VzZWRbYmluZGluZyArICdfJyArIHRoaXMucHJvcHMuc2hvcnRjdXQuc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqIENoZWNrIGN1cnJlbnQgY2hhaW4gKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNBdmFpbGFibGUgJiZcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5rZXlCaW5kaW5nc1VzZWQpLmluZGV4T2YoY3VycmVudENoYWluICsgJ18nICsgdGhpcy5wcm9wcy5zaG9ydGN1dC5zZWxlY3RvcikgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGFpbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGFrZW5CeU9iamVjdCA9IHRoaXMucHJvcHMua2V5QmluZGluZ3NVc2VkW2N1cnJlbnRDaGFpbiArICdfJyArIHRoaXMucHJvcHMuc2hvcnRjdXQuc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiogSWYgdW5hdmFpbGFibGUgc2V0IHRha2VuQnlPYmplY3QgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRha2VuQnlPYmplY3QgPSB0aGlzLnByb3BzLmtleUJpbmRpbmdzVXNlZFtrZXlzLmpvaW4oJyAnKSArIGN1cnJlbnRDaGFpbiArICdfJyArIHRoaXMucHJvcHMuc2hvcnRjdXQuc2VsZWN0b3JdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqIGFsbG93IHRvIHNldCBzaG9ydGN1dCB0byB3aGF0IGl0IGluaXRpYWxseSB3YXMgaWYgcmVwbGFjaW5nICovXG4gICAgICAgICAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRha2VuQnlPYmplY3QudGFrZW5CeS5pZCA9PT0gdGhpcy5wcm9wcy5zaG9ydGN1dC5pZCAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm5ld09yUmVwbGFjZSA9PT0gJ3JlcGxhY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGFrZW5CeU9iamVjdCA9IG5ldyBUYWtlbkJ5T2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzQXZhaWxhYmxlOiBpc0F2YWlsYWJsZSB9KTtcbiAgICAgICAgICAgIHJldHVybiB0YWtlbkJ5T2JqZWN0O1xuICAgICAgICB9O1xuICAgICAgICAvKiogUGFyc2UgYW5kIG5vcm1hbGl6ZSB1c2VyIGlucHV0ICovXG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5wYXJzZUNoYWluaW5nKGV2ZW50LCB0aGlzLnN0YXRlLnZhbHVlLCB0aGlzLnN0YXRlLnVzZXJJbnB1dCwgdGhpcy5zdGF0ZS5rZXlzLCB0aGlzLnN0YXRlLmN1cnJlbnRDaGFpbik7XG4gICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSBwYXJzZWRbMF07XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gcGFyc2VkWzFdO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudENoYWluID0gcGFyc2VkWzJdO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnRvU3ltYm9scyh1c2VySW5wdXQpO1xuICAgICAgICAgICAgbGV0IHRha2VuQnlPYmplY3QgPSB0aGlzLmNoZWNrU2hvcnRjdXRBdmFpbGFiaWxpdHkodXNlcklucHV0LCBrZXlzLCBjdXJyZW50Q2hhaW4pO1xuICAgICAgICAgICAgdGhpcy5jaGVja0NvbmZsaWN0KHRha2VuQnlPYmplY3QsIGtleXMpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHVzZXJJbnB1dDogdXNlcklucHV0LFxuICAgICAgICAgICAgICAgIHRha2VuQnlPYmplY3Q6IHRha2VuQnlPYmplY3QsXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hhaW46IGN1cnJlbnRDaGFpblxuICAgICAgICAgICAgfSwgKCkgPT4gdGhpcy5jaGVja05vbkZ1bmN0aW9uYWwodGhpcy5zdGF0ZS51c2VySW5wdXQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgIChldmVudC5yZWxhdGVkVGFyZ2V0LmlkICE9PSAnbm8tYmx1cicgJiZcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldC5pZCAhPT0gJ292ZXJ3cml0ZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVJbnB1dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnB1dDogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNsZWFyQ29uZmxpY3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgIHVzZXJJbnB1dDogJycsXG4gICAgICAgICAgICBpc0F2YWlsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb25hbDogdGhpcy5wcm9wcy5uZXdPclJlcGxhY2UgPT09ICdyZXBsYWNlJyxcbiAgICAgICAgICAgIHRha2VuQnlPYmplY3Q6IG5ldyBUYWtlbkJ5T2JqZWN0KCksXG4gICAgICAgICAgICBrZXlzOiBuZXcgQXJyYXkoKSxcbiAgICAgICAgICAgIGN1cnJlbnRDaGFpbjogJycsXG4gICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjaGVja0NvbmZsaWN0KHRha2VuQnlPYmplY3QsIGtleXMpIHtcbiAgICAgICAgaWYgKHRha2VuQnlPYmplY3QuaWQgIT09ICcnICYmXG4gICAgICAgICAgICB0YWtlbkJ5T2JqZWN0LnRha2VuQnkuaWQgIT09IHRoaXMucHJvcHMuc2hvcnRjdXQuaWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc29ydENvbmZsaWN0KHRoaXMucHJvcHMuc2hvcnRjdXQsIHRha2VuQnlPYmplY3QsIHRha2VuQnlPYmplY3QudGFrZW5CeUxhYmVsLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNsZWFyQ29uZmxpY3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRoaXMucHJvcHMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGxldCBpbnB1dENsYXNzTmFtZSA9IElucHV0U3R5bGU7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBjbGFzc2VzKGlucHV0Q2xhc3NOYW1lLCBJbnB1dFVuYXZhaWxhYmxlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5kaXNwbGF5SW5wdXRcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMubmV3T3JSZXBsYWNlID09PSAnbmV3J1xuICAgICAgICAgICAgICAgICAgICA/IGNsYXNzZXMoSW5wdXRCb3hTdHlsZSwgSW5wdXRCb3hOZXdTdHlsZSlcbiAgICAgICAgICAgICAgICAgICAgOiBJbnB1dEJveFN0eWxlXG4gICAgICAgICAgICAgICAgOiBJbnB1dEJveEhpZGRlblN0eWxlLCBvbkJsdXI6IGV2ZW50ID0+IHRoaXMuaGFuZGxlQmx1cihldmVudCkgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyB0YWJJbmRleDogMCwgaWQ6IFwibm8tYmx1clwiLCBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBvbktleURvd246IHRoaXMuaGFuZGxlSW5wdXQsIHJlZjogaW5wdXQgPT4gaW5wdXQgJiYgaW5wdXQuZm9jdXMoKSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMucHJvcHMubmV3T3JSZXBsYWNlID09PSAncmVwbGFjZSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gY2xhc3NlcyhJbnB1dFRleHRTdHlsZSwgSW5wdXRTZWxlY3RlZFRleHRTdHlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZSA9PT0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNsYXNzZXMoSW5wdXRUZXh0U3R5bGUsIElucHV0V2FpdGluZ1N0eWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogSW5wdXRUZXh0U3R5bGUgfSwgdGhpcy5zdGF0ZS52YWx1ZSA9PT0gJydcbiAgICAgICAgICAgICAgICAgICAgPyB0cmFucy5fXygncHJlc3Mga2V5cycpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogIXRoaXMuc3RhdGUuaXNGdW5jdGlvbmFsXG4gICAgICAgICAgICAgICAgICAgID8gY2xhc3NlcyhTdWJtaXRTdHlsZSwgU3VibWl0Tm9uRnVuY3Rpb25hbFN0eWxlKVxuICAgICAgICAgICAgICAgICAgICA6ICF0aGlzLnN0YXRlLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGNsYXNzZXMoU3VibWl0U3R5bGUsIFN1Ym1pdENvbmZsaWN0U3R5bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNsYXNzZXMoU3VibWl0U3R5bGUpLCBpZDogJ25vLWJsdXInLCBkaXNhYmxlZDogIXRoaXMuc3RhdGUuaXNBdmFpbGFibGUgfHwgIXRoaXMuc3RhdGUuaXNGdW5jdGlvbmFsLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm5ld09yUmVwbGFjZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENoYWluOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZUlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogZG9uJ3QgcmVwbGFjZSBpZiBmaWVsZCBoYXMgbm90IGJlZW4gZWRpdGVkICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlSW5wdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQ6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jbGVhckNvbmZsaWN0cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAhdGhpcy5zdGF0ZS5pc0F2YWlsYWJsZSAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGhpZGRlbjogdHJ1ZSwgaWQ6IFwib3ZlcndyaXRlXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB0aGlzLmhhbmRsZU92ZXJ3cml0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNsZWFyQ29uZmxpY3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlSW5wdXQoKTtcbiAgICAgICAgICAgICAgICB9IH0sIHRyYW5zLl9fKCdPdmVyd3JpdGUnKSkpKSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2hvcnRjdXRJbnB1dC5qcy5tYXAiLCJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY2xhc3NlcyB9IGZyb20gJ3R5cGVzdHlsZSc7XG5pbXBvcnQgeyBDZWxsU3R5bGUsIENvbW1hU3R5bGUsIENvbmZsaWN0Q29udGFpbmVyU3R5bGUsIEVtcHR5U2hvcnRjdXRDZWxsU3R5bGUsIEVycm9yQnV0dG9uU3R5bGUsIEVycm9yTWVzc2FnZVN0eWxlLCBPclN0eWxlLCBPclR3b1N0eWxlLCBQbHVzU3R5bGUsIFJlc2V0U3R5bGUsIFJvd1N0eWxlLCBTaG9ydGN1dENlbGxTdHlsZSwgU2hvcnRjdXRDb250YWluZXJTdHlsZSwgU2hvcnRjdXRLZXlzQ29udGFpbmVyU3R5bGUsIFNob3J0Y3V0S2V5c1N0eWxlLCBTaW5nbGVTaG9ydGN1dENlbGxTdHlsZSwgU291cmNlQ2VsbFN0eWxlIH0gZnJvbSAnLi4vY29tcG9uZW50U3R5bGUvU2hvcnRjdXRJdGVtU3R5bGUnO1xuaW1wb3J0IHsgU2hvcnRjdXRJbnB1dCB9IGZyb20gJy4vU2hvcnRjdXRJbnB1dCc7XG52YXIgU2hvcnRDdXRMb2NhdGlvbjtcbihmdW5jdGlvbiAoU2hvcnRDdXRMb2NhdGlvbikge1xuICAgIFNob3J0Q3V0TG9jYXRpb25bU2hvcnRDdXRMb2NhdGlvbltcIkxlZnRcIl0gPSAwXSA9IFwiTGVmdFwiO1xuICAgIFNob3J0Q3V0TG9jYXRpb25bU2hvcnRDdXRMb2NhdGlvbltcIlJpZ2h0XCJdID0gMV0gPSBcIlJpZ2h0XCI7XG59KShTaG9ydEN1dExvY2F0aW9uIHx8IChTaG9ydEN1dExvY2F0aW9uID0ge30pKTtcbi8qKiBEZXNjcmliZSBjb21tYW5kcyB0aGF0IGFyZSB1c2VkIGJ5IHNob3J0Y3V0cyAqL1xuZnVuY3Rpb24gZ2V0Q29tbWFuZHModHJhbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG9ydGN1dEVkaXRMZWZ0OiB7XG4gICAgICAgICAgICBjb21tYW5kSWQ6ICdzaG9ydGN1dHVpOkVkaXRMZWZ0JyxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRWRpdCBGaXJzdCcpLFxuICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0VkaXQgZXhpc3Rpbmcgc2hvcnRjdXQnKVxuICAgICAgICB9LFxuICAgICAgICBzaG9ydGN1dEVkaXRSaWdodDoge1xuICAgICAgICAgICAgY29tbWFuZElkOiAnc2hvcnRjdXR1aTpFZGl0UmlnaHQnLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFZGl0IFNlY29uZCcpLFxuICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0VkaXQgZXhpc3Rpbmcgc2hvcnRjdXQnKVxuICAgICAgICB9LFxuICAgICAgICBzaG9ydGN1dEVkaXQ6IHtcbiAgICAgICAgICAgIGNvbW1hbmRJZDogJ3Nob3J0Y3V0dWk6RWRpdCcsXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0VkaXQnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdFZGl0IGV4aXN0aW5nIHNob3J0Y3V0JylcbiAgICAgICAgfSxcbiAgICAgICAgc2hvcnRjdXRBZGROZXc6IHtcbiAgICAgICAgICAgIGNvbW1hbmRJZDogJ3Nob3J0Y3V0dWk6QWRkTmV3JyxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWRkJyksXG4gICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQWRkIG5ldyBzaG9ydGN1dCcpXG4gICAgICAgIH0sXG4gICAgICAgIHNob3J0Y3V0QWRkQW5vdGhlcjoge1xuICAgICAgICAgICAgY29tbWFuZElkOiAnc2hvcnRjdXR1aTpBZGRBbm90aGVyJyxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWRkJyksXG4gICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQWRkIGFub3RoZXIgc2hvcnRjdXQnKVxuICAgICAgICB9LFxuICAgICAgICBzaG9ydGN1dFJlc2V0OiB7XG4gICAgICAgICAgICBjb21tYW5kSWQ6ICdzaG9ydGN1dHVpOlJlc2V0JyxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVzZXQnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZXNldCBzaG9ydGN1dCBiYWNrIHRvIGRlZmF1bHQnKVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKiBSZWFjdCBjb21wb25lbnQgZm9yIGVhY2ggY29tbWFuZCBzaG9ydGN1dCBpdGVtICovXG5leHBvcnQgY2xhc3MgU2hvcnRjdXRJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIC8qKiBUb2dnbGUgZGlzcGxheSBzdGF0ZSBvZiBpbnB1dCBib3ggKi9cbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dE5ldyA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRpc3BsYXlOZXdJbnB1dDogIXRoaXMuc3RhdGUuZGlzcGxheU5ld0lucHV0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFJlcGxhY2VMZWZ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGlzcGxheVJlcGxhY2VJbnB1dExlZnQ6ICF0aGlzLnN0YXRlLmRpc3BsYXlSZXBsYWNlSW5wdXRMZWZ0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFJlcGxhY2VSaWdodCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRpc3BsYXlSZXBsYWNlSW5wdXRSaWdodDogIXRoaXMuc3RhdGUuZGlzcGxheVJlcGxhY2VJbnB1dFJpZ2h0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRDb21tYW5kSWZOZWVkZWQgPSAoY29tbWFuZCwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLnByb3BzLnNob3J0Y3V0LmNvbW1hbmROYW1lICsgJ18nICsgdGhpcy5wcm9wcy5zaG9ydGN1dC5zZWxlY3RvcjtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9wcy5leHRlcm5hbC5oYXNDb21tYW5kKGNvbW1hbmQuY29tbWFuZElkICsga2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0ZXJuYWwuYWRkQ29tbWFuZChjb21tYW5kLmNvbW1hbmRJZCArIGtleSwge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY29tbWFuZC5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogY29tbWFuZC5jYXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBleGVjdXRlOiBhY3Rpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVSaWdodENsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbWFuZElmTmVlZGVkKHRoaXMuX2NvbW1hbmRzLnNob3J0Y3V0RWRpdCwgKCkgPT4gdGhpcy50b2dnbGVJbnB1dFJlcGxhY2VMZWZ0KCkpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb21tYW5kSWZOZWVkZWQodGhpcy5fY29tbWFuZHMuc2hvcnRjdXRFZGl0TGVmdCwgKCkgPT4gdGhpcy50b2dnbGVJbnB1dFJlcGxhY2VMZWZ0KCkpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb21tYW5kSWZOZWVkZWQodGhpcy5fY29tbWFuZHMuc2hvcnRjdXRFZGl0UmlnaHQsICgpID0+IHRoaXMudG9nZ2xlSW5wdXRSZXBsYWNlUmlnaHQoKSk7XG4gICAgICAgICAgICB0aGlzLmFkZENvbW1hbmRJZk5lZWRlZCh0aGlzLl9jb21tYW5kcy5zaG9ydGN1dEFkZE5ldywgKCkgPT4gdGhpcy50b2dnbGVJbnB1dE5ldygpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbWFuZElmTmVlZGVkKHRoaXMuX2NvbW1hbmRzLnNob3J0Y3V0QWRkQW5vdGhlciwgKCkgPT4gdGhpcy50b2dnbGVJbnB1dE5ldygpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbWFuZElmTmVlZGVkKHRoaXMuX2NvbW1hbmRzLnNob3J0Y3V0UmVzZXQsICgpID0+IHRoaXMucHJvcHMucmVzZXRTaG9ydGN1dCh0aGlzLnByb3BzLnNob3J0Y3V0KSk7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLnByb3BzLnNob3J0Y3V0LmNvbW1hbmROYW1lICsgJ18nICsgdGhpcy5wcm9wcy5zaG9ydGN1dC5zZWxlY3RvcjtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG51bVNob3J0Y3V0czogT2JqZWN0LmtleXModGhpcy5wcm9wcy5zaG9ydGN1dC5rZXlzKS5maWx0ZXIoa2V5ID0+IHRoaXMucHJvcHMuc2hvcnRjdXQua2V5c1trZXldWzBdICE9PSAnJykubGVuZ3RoXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbW1hbmRMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubnVtU2hvcnRjdXRzID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZExpc3QgPSBjb21tYW5kTGlzdC5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tbWFuZHMuc2hvcnRjdXRFZGl0TGVmdC5jb21tYW5kSWQgKyBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21tYW5kcy5zaG9ydGN1dEVkaXRSaWdodC5jb21tYW5kSWQgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUubnVtU2hvcnRjdXRzID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZExpc3QgPSBjb21tYW5kTGlzdC5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tbWFuZHMuc2hvcnRjdXRFZGl0LmNvbW1hbmRJZCArIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbW1hbmRzLnNob3J0Y3V0QWRkQW5vdGhlci5jb21tYW5kSWQgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kTGlzdCA9IGNvbW1hbmRMaXN0LmNvbmNhdChbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21tYW5kcy5zaG9ydGN1dEFkZE5ldy5jb21tYW5kSWQgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3J0Y3V0LnNvdXJjZSA9PT0gJ0N1c3RvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZExpc3QgPSBjb21tYW5kTGlzdC5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tbWFuZHMuc2hvcnRjdXRSZXNldC5jb21tYW5kSWQgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY29udGV4dE1lbnUoZSwgY29tbWFuZExpc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBUcmFuc2Zvcm0gc3BlY2lhbCBrZXkgbmFtZXMgaW50byB1bmljb2RlIGNoYXJhY3RlcnMgKi9cbiAgICAgICAgdGhpcy50b1N5bWJvbHMgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnICcpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnQ3RybCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQgKyAnIOKMgycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnQWx0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlc3VsdCArICcg4oylJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdTaGlmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQgKyAnIOKHpycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnQWNjZWwnICYmIFBsYXRmb3JtLklTX01BQykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlc3VsdCArICcg4oyYJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdBY2NlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQgKyAnIOKMgycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocmVzdWx0ICsgJyAnICsga2V5KS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgJycpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jb21tYW5kcyA9IGdldENvbW1hbmRzKHByb3BzLmV4dGVybmFsLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRpc3BsYXlOZXdJbnB1dDogZmFsc2UsXG4gICAgICAgICAgICBkaXNwbGF5UmVwbGFjZUlucHV0TGVmdDogZmFsc2UsXG4gICAgICAgICAgICBkaXNwbGF5UmVwbGFjZUlucHV0UmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgbnVtU2hvcnRjdXRzOiBPYmplY3Qua2V5cyh0aGlzLnByb3BzLnNob3J0Y3V0LmtleXMpLmZpbHRlcihrZXkgPT4gdGhpcy5wcm9wcy5zaG9ydGN1dC5rZXlzW2tleV1bMF0gIT09ICcnKS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0RXJyb3JSb3coKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy5leHRlcm5hbC50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc2VzKFJvd1N0eWxlKSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQ29uZmxpY3RDb250YWluZXJTdHlsZSh0aGlzLnByb3BzLnNob3dTZWxlY3RvcnMsIHRoaXMucHJvcHMuZXJyb3JTaXplKSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IEVycm9yTWVzc2FnZVN0eWxlIH0sIHRyYW5zLl9fKCdTaG9ydGN1dCBhbHJlYWR5IGluIHVzZSBieSAlMS4gT3ZlcndyaXRlIGl0PycsIHRoaXMucHJvcHMuc2hvcnRjdXQudGFrZW5CeS50YWtlbkJ5TGFiZWwpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBFcnJvckJ1dHRvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgbnVsbCwgdHJhbnMuX18oJ0NhbmNlbCcpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGlkOiBcIm5vLWJsdXJcIiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcndyaXRlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCB0cmFucy5fXygnT3ZlcndyaXRlJykpKSkpKTtcbiAgICB9XG4gICAgZ2V0Q2F0ZWdvcnlDZWxsKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQ2VsbFN0eWxlIH0sIHRoaXMucHJvcHMuc2hvcnRjdXQuY2F0ZWdvcnkpO1xuICAgIH1cbiAgICBnZXRMYWJlbENlbGwoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQ2VsbFN0eWxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWxhYmVsXCIgfSwgdGhpcy5wcm9wcy5zaG9ydGN1dC5sYWJlbCkpKTtcbiAgICB9XG4gICAgZ2V0UmVzZXRTaG9ydEN1dExpbmsoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy5leHRlcm5hbC50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogUmVzZXRTdHlsZSwgb25DbGljazogKCkgPT4gdGhpcy5wcm9wcy5yZXNldFNob3J0Y3V0KHRoaXMucHJvcHMuc2hvcnRjdXQpIH0sIHRyYW5zLl9fKCdSZXNldCcpKSk7XG4gICAgfVxuICAgIGdldFNvdXJjZUNlbGwoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQ2VsbFN0eWxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBTb3VyY2VDZWxsU3R5bGUgfSwgdGhpcy5wcm9wcy5zaG9ydGN1dC5zb3VyY2UpLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG9ydGN1dC5zb3VyY2UgPT09ICdDdXN0b20nICYmIHRoaXMuZ2V0UmVzZXRTaG9ydEN1dExpbmsoKSkpO1xuICAgIH1cbiAgICBnZXRPcHRpb25hbFNlbGVjdG9yQ2VsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd1NlbGVjdG9ycyA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBDZWxsU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtc2VsZWN0b3JcIiB9LCB0aGlzLnByb3BzLnNob3J0Y3V0LnNlbGVjdG9yKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCkpO1xuICAgIH1cbiAgICBnZXRDbGFzc05hbWVGb3JTaG9ydEN1dHMobm9uRW1wdHlLZXlzKSB7XG4gICAgICAgIHJldHVybiBub25FbXB0eUtleXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IGNsYXNzZXMoU2hvcnRjdXRDZWxsU3R5bGUsIEVtcHR5U2hvcnRjdXRDZWxsU3R5bGUpXG4gICAgICAgICAgICA6IG5vbkVtcHR5S2V5cy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICA/IGNsYXNzZXMoU2hvcnRjdXRDZWxsU3R5bGUsIFNpbmdsZVNob3J0Y3V0Q2VsbFN0eWxlKVxuICAgICAgICAgICAgICAgIDogU2hvcnRjdXRDZWxsU3R5bGU7XG4gICAgfVxuICAgIGdldFRvZ2dsZUlucHV0UmVwbGFjZU1ldGhvZChsb2NhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFNob3J0Q3V0TG9jYXRpb24uTGVmdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVJbnB1dFJlcGxhY2VMZWZ0O1xuICAgICAgICAgICAgY2FzZSBTaG9ydEN1dExvY2F0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUlucHV0UmVwbGFjZVJpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldERpc3BsYXlSZXBsYWNlSW5wdXQobG9jYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgICAgICAgICAgY2FzZSBTaG9ydEN1dExvY2F0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheVJlcGxhY2VJbnB1dExlZnQ7XG4gICAgICAgICAgICBjYXNlIFNob3J0Q3V0TG9jYXRpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheVJlcGxhY2VJbnB1dFJpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldE9yRGlwbGF5SWZOZWVkZWQobm9uRW1wdHlLZXlzKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy5leHRlcm5hbC50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBub25FbXB0eUtleXMubGVuZ3RoID09IDIgfHwgdGhpcy5zdGF0ZS5kaXNwbGF5TmV3SW5wdXRcbiAgICAgICAgICAgICAgICA/IE9yVHdvU3R5bGVcbiAgICAgICAgICAgICAgICA6IE9yU3R5bGUsIGlkOiBub25FbXB0eUtleXMubGVuZ3RoID09IDJcbiAgICAgICAgICAgICAgICA/ICdzZWNvbmRvcidcbiAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdGUuZGlzcGxheVJlcGxhY2VJbnB1dExlZnRcbiAgICAgICAgICAgICAgICAgICAgPyAnbm9vcidcbiAgICAgICAgICAgICAgICAgICAgOiAnb3InIH0sIHRyYW5zLl9fKCdvcicpKSk7XG4gICAgfVxuICAgIGdldFNob3J0Q3V0QXNJbnB1dChrZXksIGxvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaG9ydGN1dElucHV0LCB7IGhhbmRsZVVwZGF0ZTogdGhpcy5wcm9wcy5oYW5kbGVVcGRhdGUsIGRlbGV0ZVNob3J0Y3V0OiB0aGlzLnByb3BzLmRlbGV0ZVNob3J0Y3V0LCB0b2dnbGVJbnB1dDogdGhpcy5nZXRUb2dnbGVJbnB1dFJlcGxhY2VNZXRob2QobG9jYXRpb24pLCBzaG9ydGN1dDogdGhpcy5wcm9wcy5zaG9ydGN1dCwgc2hvcnRjdXRJZDoga2V5LCB0b1N5bWJvbHM6IHRoaXMudG9TeW1ib2xzLCBrZXlCaW5kaW5nc1VzZWQ6IHRoaXMucHJvcHMua2V5QmluZGluZ3NVc2VkLCBzb3J0Q29uZmxpY3Q6IHRoaXMucHJvcHMuc29ydENvbmZsaWN0LCBjbGVhckNvbmZsaWN0czogdGhpcy5wcm9wcy5jbGVhckNvbmZsaWN0cywgZGlzcGxheUlucHV0OiB0aGlzLmdldERpc3BsYXlSZXBsYWNlSW5wdXQobG9jYXRpb24pLCBuZXdPclJlcGxhY2U6ICdyZXBsYWNlJywgcGxhY2Vob2xkZXI6IHRoaXMudG9TeW1ib2xzKHRoaXMucHJvcHMuc2hvcnRjdXQua2V5c1trZXldLmpvaW4oJywgJykpLCB0cmFuc2xhdG9yOiB0aGlzLnByb3BzLmV4dGVybmFsLnRyYW5zbGF0b3IgfSkpO1xuICAgIH1cbiAgICBnZXRTaG9ydEN1dEZvckRpc3BsYXlPbmx5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG9ydGN1dC5rZXlzW2tleV0ubWFwKChrZXlCaW5kaW5nLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFNob3J0Y3V0S2V5c0NvbnRhaW5lclN0eWxlLCBrZXk6IGluZGV4IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBTaG9ydGN1dEtleXNTdHlsZSwgaWQ6ICdzaG9ydGN1dC1rZXlzJyB9LCB0aGlzLnRvU3ltYm9scyhrZXlCaW5kaW5nKSksXG4gICAgICAgICAgICBpbmRleCArIDEgPCB0aGlzLnByb3BzLnNob3J0Y3V0LmtleXNba2V5XS5sZW5ndGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQ29tbWFTdHlsZSB9LCBcIixcIikpIDogbnVsbCkpKTtcbiAgICB9XG4gICAgaXNMb2NhdGlvbkJlaW5nRWRpdGVkKGxvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiAoKGxvY2F0aW9uID09PSBTaG9ydEN1dExvY2F0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGlzcGxheVJlcGxhY2VJbnB1dExlZnQpIHx8XG4gICAgICAgICAgICAobG9jYXRpb24gPT09IFNob3J0Q3V0TG9jYXRpb24uUmlnaHQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRpc3BsYXlSZXBsYWNlSW5wdXRSaWdodCkpO1xuICAgIH1cbiAgICBnZXRMb2NhdGlvbkZyb21JbmRleChpbmRleCkge1xuICAgICAgICByZXR1cm4gaW5kZXggPT09IDAgPyBTaG9ydEN1dExvY2F0aW9uLkxlZnQgOiBTaG9ydEN1dExvY2F0aW9uLlJpZ2h0O1xuICAgIH1cbiAgICBnZXREaXZGb3JLZXkoaW5kZXgsIGtleSwgbm9uRW1wdHlLZXlzKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbkZyb21JbmRleChpbmRleCk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU2hvcnRjdXRDb250YWluZXJTdHlsZSwga2V5OiB0aGlzLnByb3BzLnNob3J0Y3V0LmlkICsgJ18nICsgaW5kZXgsIG9uQ2xpY2s6IHRoaXMuZ2V0VG9nZ2xlSW5wdXRSZXBsYWNlTWV0aG9kKGxvY2F0aW9uKSB9LFxuICAgICAgICAgICAgdGhpcy5pc0xvY2F0aW9uQmVpbmdFZGl0ZWQobG9jYXRpb24pXG4gICAgICAgICAgICAgICAgPyB0aGlzLmdldFNob3J0Q3V0QXNJbnB1dChrZXksIGxvY2F0aW9uKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXRTaG9ydEN1dEZvckRpc3BsYXlPbmx5KGtleSksXG4gICAgICAgICAgICBsb2NhdGlvbiA9PT0gU2hvcnRDdXRMb2NhdGlvbi5MZWZ0ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPckRpcGxheUlmTmVlZGVkKG5vbkVtcHR5S2V5cykpKTtcbiAgICB9XG4gICAgZ2V0QWRkTGluaygpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnByb3BzLmV4dGVybmFsLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiAhdGhpcy5zdGF0ZS5kaXNwbGF5TmV3SW5wdXQgPyBQbHVzU3R5bGUgOiAnJywgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSW5wdXROZXcoKSwgdGhpcy5wcm9wcy5jbGVhckNvbmZsaWN0cygpO1xuICAgICAgICAgICAgfSwgaWQ6IFwiYWRkLWxpbmtcIiB9LCB0cmFucy5fXygnQWRkJykpKTtcbiAgICB9XG4gICAgZ2V0SW5wdXRCb3hXaGVuVG9nZ2xlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheU5ld0lucHV0ID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2hvcnRjdXRJbnB1dCwgeyBoYW5kbGVVcGRhdGU6IHRoaXMucHJvcHMuaGFuZGxlVXBkYXRlLCBkZWxldGVTaG9ydGN1dDogdGhpcy5wcm9wcy5kZWxldGVTaG9ydGN1dCwgdG9nZ2xlSW5wdXQ6IHRoaXMudG9nZ2xlSW5wdXROZXcsIHNob3J0Y3V0OiB0aGlzLnByb3BzLnNob3J0Y3V0LCBzaG9ydGN1dElkOiBcIlwiLCB0b1N5bWJvbHM6IHRoaXMudG9TeW1ib2xzLCBrZXlCaW5kaW5nc1VzZWQ6IHRoaXMucHJvcHMua2V5QmluZGluZ3NVc2VkLCBzb3J0Q29uZmxpY3Q6IHRoaXMucHJvcHMuc29ydENvbmZsaWN0LCBjbGVhckNvbmZsaWN0czogdGhpcy5wcm9wcy5jbGVhckNvbmZsaWN0cywgZGlzcGxheUlucHV0OiB0aGlzLnN0YXRlLmRpc3BsYXlOZXdJbnB1dCwgbmV3T3JSZXBsYWNlOiAnbmV3JywgcGxhY2Vob2xkZXI6ICcnLCB0cmFuc2xhdG9yOiB0aGlzLnByb3BzLmV4dGVybmFsLnRyYW5zbGF0b3IgfSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCkpO1xuICAgIH1cbiAgICBnZXRTaG9ydEN1dHNDZWxsKG5vbkVtcHR5S2V5cykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IENlbGxTdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWVGb3JTaG9ydEN1dHMobm9uRW1wdHlLZXlzKSB9LFxuICAgICAgICAgICAgICAgIG5vbkVtcHR5S2V5cy5tYXAoKGtleSwgaW5kZXgpID0+IHRoaXMuZ2V0RGl2Rm9yS2V5KGluZGV4LCBrZXksIG5vbkVtcHR5S2V5cykpLFxuICAgICAgICAgICAgICAgIG5vbkVtcHR5S2V5cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuc3RhdGUuZGlzcGxheU5ld0lucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLnN0YXRlLmRpc3BsYXlSZXBsYWNlSW5wdXRMZWZ0ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWRkTGluaygpLFxuICAgICAgICAgICAgICAgIG5vbkVtcHR5S2V5cy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuc3RhdGUuZGlzcGxheU5ld0lucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWRkTGluaygpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW5wdXRCb3hXaGVuVG9nZ2xlZCgpKSkpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IG5vbkVtcHR5S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc2hvcnRjdXQua2V5cykuZmlsdGVyKChrZXkpID0+IHRoaXMucHJvcHMuc2hvcnRjdXQua2V5c1trZXldWzBdICE9PSAnJyk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3J0Y3V0LmlkID09PSAnZXJyb3Jfcm93Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JSb3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogUm93U3R5bGUsIG9uQ29udGV4dE1lbnU6IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnBlcnNpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSaWdodENsaWNrKGUpO1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldENhdGVnb3J5Q2VsbCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGFiZWxDZWxsKCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaG9ydEN1dHNDZWxsKG5vbkVtcHR5S2V5cyksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTb3VyY2VDZWxsKCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPcHRpb25hbFNlbGVjdG9yQ2VsbCgpKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaG9ydGN1dEl0ZW0uanMubWFwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2hvcnRjdXRMaXN0Q29udGFpbmVyU3R5bGUsIFNob3J0Y3V0TGlzdFN0eWxlIH0gZnJvbSAnLi4vY29tcG9uZW50U3R5bGUvU2hvcnRjdXRMaXN0U3R5bGUnO1xuaW1wb3J0IHsgU2hvcnRjdXRJdGVtIH0gZnJvbSAnLi9TaG9ydGN1dEl0ZW0nO1xuY29uc3QgVE9QTkFWX0hFSUdIVCA9IDExNTtcbi8qKiBSZWFjdCBjb21wb25lbnQgZm9yIGxpc3Qgb2Ygc2hvcnRjdXRzICovXG5leHBvcnQgY2xhc3MgU2hvcnRjdXRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU2hvcnRjdXRMaXN0Q29udGFpbmVyU3R5bGUoVE9QTkFWX0hFSUdIVCwgdGhpcy5wcm9wcy5oZWlnaHQpLCBpZDogXCJzaG9ydGN1dExpc3RDb250YWluZXJcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU2hvcnRjdXRMaXN0U3R5bGUgfSwgdGhpcy5wcm9wcy5zaG9ydGN1dHMubWFwKChzaG9ydGN1dCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaG9ydGN1dEl0ZW0sIHsga2V5OiBzaG9ydGN1dC5jb21tYW5kTmFtZSArICdfJyArIHNob3J0Y3V0LnNlbGVjdG9yLCByZXNldFNob3J0Y3V0OiB0aGlzLnByb3BzLnJlc2V0U2hvcnRjdXQsIHNob3J0Y3V0OiBzaG9ydGN1dCwgaGFuZGxlVXBkYXRlOiB0aGlzLnByb3BzLmhhbmRsZVVwZGF0ZSwgZGVsZXRlU2hvcnRjdXQ6IHRoaXMucHJvcHMuZGVsZXRlU2hvcnRjdXQsIHNob3dTZWxlY3RvcnM6IHRoaXMucHJvcHMuc2hvd1NlbGVjdG9ycywga2V5QmluZGluZ3NVc2VkOiB0aGlzLnByb3BzLmtleUJpbmRpbmdzVXNlZCwgc29ydENvbmZsaWN0OiB0aGlzLnByb3BzLnNvcnRDb25mbGljdCwgY2xlYXJDb25mbGljdHM6IHRoaXMucHJvcHMuY2xlYXJDb25mbGljdHMsIGVycm9yU2l6ZTogdGhpcy5wcm9wcy5lcnJvclNpemUsIGNvbnRleHRNZW51OiB0aGlzLnByb3BzLmNvbnRleHRNZW51LCBleHRlcm5hbDogdGhpcy5wcm9wcy5leHRlcm5hbCB9KSk7XG4gICAgICAgICAgICB9KSkpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaG9ydGN1dExpc3QuanMubWFwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY2xhc3NlcyB9IGZyb20gJ3R5cGVzdHlsZSc7XG5pbXBvcnQgeyBDdXJyZW50SGVhZGVyU3R5bGUsIEhlYWRlclN0eWxlLCBTb3J0QnV0dG9uU3R5bGUgfSBmcm9tICcuLi9jb21wb25lbnRTdHlsZS9TaG9ydGN1dFRpdGxlSXRlbVN0eWxlJztcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dFRpdGxlSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5wcm9wcy5hY3RpdmVcbiAgICAgICAgICAgICAgICA/IGNsYXNzZXMoSGVhZGVyU3R5bGUsIEN1cnJlbnRIZWFkZXJTdHlsZSlcbiAgICAgICAgICAgICAgICA6IEhlYWRlclN0eWxlLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLnVwZGF0ZVNvcnQodGhpcy5wcm9wcy50aXRsZS50b0xvd2VyQ2FzZSgpKSB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFNvcnRCdXR0b25TdHlsZSB9LCBcIlxcdTIzMDNcIikpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaG9ydGN1dFRpdGxlSXRlbS5qcy5tYXAiLCJpbXBvcnQgeyBBcnJheUV4dCwgU3RyaW5nRXh0IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgU2hvcnRjdXRVSVN0eWxlLCBUb3BXaGl0ZXNwYWNlU3R5bGUgfSBmcm9tICcuLi9jb21wb25lbnRTdHlsZS9TaG9ydGN1dFVJU3R5bGUnO1xuaW1wb3J0IHsgU2hvcnRjdXRMaXN0IH0gZnJvbSAnLi9TaG9ydGN1dExpc3QnO1xuaW1wb3J0IHsgVG9wTmF2IH0gZnJvbSAnLi9Ub3BOYXYnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRXJyb3JPYmplY3QsIFNob3J0Y3V0T2JqZWN0LCBUYWtlbkJ5T2JqZWN0IH0gZnJvbSAnLi9TaG9ydGN1dElucHV0Jztcbi8qKiBOb3JtYWxpemUgdGhlIHF1ZXJ5IHRleHQgZm9yIGEgZnV6enkgc2VhcmNoLiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUXVlcnkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xccysvZywgJycpLnRvTG93ZXJDYXNlKCk7XG59XG4vKiogUGVyZm9ybSBhIGZ1enp5IHNlYXJjaCBvbiBhIHNpbmdsZSBjb21tYW5kIGl0ZW0uICovXG5mdW5jdGlvbiBmdXp6eVNlYXJjaChpdGVtLCBxdWVyeSkge1xuICAgIC8vIENyZWF0ZSB0aGUgc291cmNlIHRleHQgdG8gYmUgc2VhcmNoZWQuXG4gICAgY29uc3QgY2F0ZWdvcnkgPSBpdGVtLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbGFiZWwgPSBpdGVtWydsYWJlbCddLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc291cmNlID0gYCR7Y2F0ZWdvcnl9ICR7bGFiZWx9YDtcbiAgICAvLyBTZXQgdXAgdGhlIG1hdGNoIHNjb3JlIGFuZCBpbmRpY2VzIGFycmF5LlxuICAgIGxldCBzY29yZSA9IEluZmluaXR5O1xuICAgIGxldCBpbmRpY2VzID0gbnVsbDtcbiAgICAvLyBUaGUgcmVnZXggZm9yIHNlYXJjaCB3b3JkIGJvdW5kYXJpZXNcbiAgICBjb25zdCByZ3ggPSAvXFxiXFx3L2c7XG4gICAgLy8gU2VhcmNoIHRoZSBzb3VyY2UgYnkgd29yZCBib3VuZGFyeS5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IHdvcmQgYm91bmRhcnkgaW4gdGhlIHNvdXJjZS5cbiAgICAgICAgY29uc3Qgcmd4TWF0Y2ggPSByZ3guZXhlYyhzb3VyY2UpO1xuICAgICAgICAvLyBCcmVhayBpZiB0aGVyZSBpcyBubyBtb3JlIHNvdXJjZSBjb250ZXh0LlxuICAgICAgICBpZiAoIXJneE1hdGNoKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBSdW4gdGhlIHN0cmluZyBtYXRjaCBvbiB0aGUgcmVsZXZhbnQgc3Vic3RyaW5nLlxuICAgICAgICBjb25zdCBtYXRjaCA9IFN0cmluZ0V4dC5tYXRjaFN1bU9mRGVsdGFzKHNvdXJjZSwgcXVlcnksIHJneE1hdGNoLmluZGV4KTtcbiAgICAgICAgLy8gQnJlYWsgaWYgdGhlcmUgaXMgbm8gbWF0Y2guXG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbWF0Y2ggaWYgdGhlIHNjb3JlIGlzIGJldHRlci5cbiAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoLnNjb3JlIDw9IHNjb3JlKSB7XG4gICAgICAgICAgICBzY29yZSA9IG1hdGNoLnNjb3JlO1xuICAgICAgICAgICAgaW5kaWNlcyA9IG1hdGNoLmluZGljZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQmFpbCBpZiB0aGVyZSB3YXMgbm8gbWF0Y2guXG4gICAgaWYgKCFpbmRpY2VzIHx8IHNjb3JlID09PSBJbmZpbml0eSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gQ29tcHV0ZSB0aGUgcGl2b3QgaW5kZXggYmV0d2VlbiBjYXRlZ29yeSBhbmQgbGFiZWwgdGV4dC5cbiAgICBjb25zdCBwaXZvdCA9IGNhdGVnb3J5Lmxlbmd0aCArIDE7XG4gICAgLy8gRmluZCB0aGUgc2xpY2UgaW5kZXggdG8gc2VwYXJhdGUgbWF0Y2hlZCBpbmRpY2VzLlxuICAgIGNvbnN0IGogPSBBcnJheUV4dC5sb3dlckJvdW5kKGluZGljZXMsIHBpdm90LCAoYSwgYikgPT4gYSAtIGIpO1xuICAgIC8vIEV4dHJhY3QgdGhlIG1hdGNoZWQgY2F0ZWdvcnkgYW5kIGxhYmVsIGluZGljZXMuXG4gICAgY29uc3QgY2F0ZWdvcnlJbmRpY2VzID0gaW5kaWNlcy5zbGljZSgwLCBqKTtcbiAgICBjb25zdCBsYWJlbEluZGljZXMgPSBpbmRpY2VzLnNsaWNlKGopO1xuICAgIC8vIEFkanVzdCB0aGUgbGFiZWwgaW5kaWNlcyBmb3IgdGhlIHBpdm90IG9mZnNldC5cbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGxhYmVsSW5kaWNlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbGFiZWxJbmRpY2VzW2ldIC09IHBpdm90O1xuICAgIH1cbiAgICAvLyBIYW5kbGUgYSBwdXJlIGxhYmVsIG1hdGNoLlxuICAgIGlmIChjYXRlZ29yeUluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXRjaFR5cGU6IDAgLyogTGFiZWwgKi8sXG4gICAgICAgICAgICBjYXRlZ29yeUluZGljZXM6IG51bGwsXG4gICAgICAgICAgICBsYWJlbEluZGljZXMsXG4gICAgICAgICAgICBzY29yZSxcbiAgICAgICAgICAgIGl0ZW1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGEgcHVyZSBjYXRlZ29yeSBtYXRjaC5cbiAgICBpZiAobGFiZWxJbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF0Y2hUeXBlOiAxIC8qIENhdGVnb3J5ICovLFxuICAgICAgICAgICAgY2F0ZWdvcnlJbmRpY2VzLFxuICAgICAgICAgICAgbGFiZWxJbmRpY2VzOiBudWxsLFxuICAgICAgICAgICAgc2NvcmUsXG4gICAgICAgICAgICBpdGVtXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIEhhbmRsZSBhIHNwbGl0IG1hdGNoLlxuICAgIHJldHVybiB7XG4gICAgICAgIG1hdGNoVHlwZTogMiAvKiBTcGxpdCAqLyxcbiAgICAgICAgY2F0ZWdvcnlJbmRpY2VzLFxuICAgICAgICBsYWJlbEluZGljZXMsXG4gICAgICAgIHNjb3JlLFxuICAgICAgICBpdGVtXG4gICAgfTtcbn1cbi8qKiBQZXJmb3JtIGEgZnV6enkgbWF0Y2ggb24gYW4gYXJyYXkgb2YgY29tbWFuZCBpdGVtcy4gKi9cbmZ1bmN0aW9uIG1hdGNoSXRlbXMoaXRlbXMsIHF1ZXJ5KSB7XG4gICAgLy8gTm9ybWFsaXplIHRoZSBxdWVyeSB0ZXh0IHRvIGxvd2VyIGNhc2Ugd2l0aCBubyB3aGl0ZXNwYWNlLlxuICAgIHF1ZXJ5ID0gbm9ybWFsaXplUXVlcnkocXVlcnkpO1xuICAgIC8vIENyZWF0ZSB0aGUgYXJyYXkgdG8gaG9sZCB0aGUgc2NvcmVzLlxuICAgIGxldCBzY29yZXMgPSBbXTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGl0ZW1zIGFuZCBtYXRjaCBhZ2FpbnN0IHRoZSBxdWVyeS5cbiAgICBsZXQgaXRlbUxpc3QgPSBPYmplY3Qua2V5cyhpdGVtcyk7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBpdGVtTGlzdC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpdGVtTGlzdFtpXV07XG4gICAgICAgIC8vIElmIHRoZSBxdWVyeSBpcyBlbXB0eSwgYWxsIGl0ZW1zIGFyZSBtYXRjaGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHNjb3Jlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXRjaFR5cGU6IDMgLyogRGVmYXVsdCAqLyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUluZGljZXM6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFiZWxJbmRpY2VzOiBudWxsLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgICAgIGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUnVuIHRoZSBmdXp6eSBzZWFyY2ggZm9yIHRoZSBpdGVtIGFuZCBxdWVyeS5cbiAgICAgICAgbGV0IHNjb3JlID0gZnV6enlTZWFyY2goaXRlbSwgcXVlcnkpO1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGl0ZW0gaWYgaXQgaXMgbm90IGEgbWF0Y2guXG4gICAgICAgIGlmICghc2NvcmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB0aGUgc2NvcmUgdG8gdGhlIHJlc3VsdHMuXG4gICAgICAgIHNjb3Jlcy5wdXNoKHNjb3JlKTtcbiAgICB9XG4gICAgLy8gUmV0dXJuIHRoZSBmaW5hbCBhcnJheSBvZiBzY29yZXMuXG4gICAgcmV0dXJuIHNjb3Jlcztcbn1cbi8qKiBUcmFuc2Zvcm0gU2V0dGluZ1JlZ2lzdHJ5J3Mgc2hvcnRjdXQgbGlzdCB0byBsaXN0IG9mIFNob3J0Y3V0T2JqZWN0cyAqL1xuZnVuY3Rpb24gZ2V0U2hvcnRjdXRPYmplY3RzKGV4dGVybmFsLCBzZXR0aW5ncykge1xuICAgIGNvbnN0IHNob3J0Y3V0cyA9IHNldHRpbmdzLmNvbXBvc2l0ZS5zaG9ydGN1dHM7XG4gICAgbGV0IHNob3J0Y3V0T2JqZWN0cyA9IHt9O1xuICAgIHNob3J0Y3V0cy5mb3JFYWNoKChzaG9ydGN1dCkgPT4ge1xuICAgICAgICBsZXQga2V5ID0gc2hvcnRjdXQuY29tbWFuZCArICdfJyArIHNob3J0Y3V0LnNlbGVjdG9yO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2hvcnRjdXRPYmplY3RzKS5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudENvdW50ID0gc2hvcnRjdXRPYmplY3RzW2tleV0ubnVtYmVyT2ZTaG9ydGN1dHM7XG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdHNba2V5XS5rZXlzW2N1cnJlbnRDb3VudF0gPSBzaG9ydGN1dC5rZXlzO1xuICAgICAgICAgICAgc2hvcnRjdXRPYmplY3RzW2tleV0ubnVtYmVyT2ZTaG9ydGN1dHMrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzaG9ydGN1dE9iamVjdCA9IG5ldyBTaG9ydGN1dE9iamVjdCgpO1xuICAgICAgICAgICAgc2hvcnRjdXRPYmplY3QuY29tbWFuZE5hbWUgPSBzaG9ydGN1dC5jb21tYW5kO1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gZXh0ZXJuYWwuZ2V0TGFiZWwoc2hvcnRjdXQuY29tbWFuZCk7XG4gICAgICAgICAgICBpZiAoIWxhYmVsKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBzaG9ydGN1dC5jb21tYW5kLnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdC5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgc2hvcnRjdXRPYmplY3QuY2F0ZWdvcnkgPSBzaG9ydGN1dC5jb21tYW5kLnNwbGl0KCc6JylbMF07XG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdC5rZXlzWzBdID0gc2hvcnRjdXQua2V5cztcbiAgICAgICAgICAgIHNob3J0Y3V0T2JqZWN0LnNlbGVjdG9yID0gc2hvcnRjdXQuc2VsZWN0b3I7XG4gICAgICAgICAgICAvLyBUT0RPIG5lZWRzIHRyYW5zbGF0aW9uXG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdC5zb3VyY2UgPSAnRGVmYXVsdCc7XG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdC5pZCA9IGtleTtcbiAgICAgICAgICAgIHNob3J0Y3V0T2JqZWN0Lm51bWJlck9mU2hvcnRjdXRzID0gMTtcbiAgICAgICAgICAgIHNob3J0Y3V0T2JqZWN0c1trZXldID0gc2hvcnRjdXRPYmplY3Q7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBmaW5kIGFsbCB0aGUgc2hvcnRjdXRzIHRoYXQgaGF2ZSBjdXN0b20gc2V0dGluZ3NcbiAgICBjb25zdCB1c2VyU2hvcnRjdXRzID0gc2V0dGluZ3MudXNlci5zaG9ydGN1dHM7XG4gICAgdXNlclNob3J0Y3V0cy5mb3JFYWNoKCh1c2VyU2V0dGluZykgPT4ge1xuICAgICAgICBjb25zdCBjb21tYW5kID0gdXNlclNldHRpbmcuY29tbWFuZDtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB1c2VyU2V0dGluZy5zZWxlY3RvcjtcbiAgICAgICAgY29uc3Qga2V5VG8gPSBjb21tYW5kICsgJ18nICsgc2VsZWN0b3I7XG4gICAgICAgIGlmIChzaG9ydGN1dE9iamVjdHNba2V5VG9dKSB7XG4gICAgICAgICAgICAvLyBUT0RPIG5lZWRzIHRyYW5zbGF0aW9uXG4gICAgICAgICAgICBzaG9ydGN1dE9iamVjdHNba2V5VG9dLnNvdXJjZSA9ICdDdXN0b20nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNob3J0Y3V0T2JqZWN0cztcbn1cbi8qKiBHZXQgbGlzdCBvZiBhbGwgc2hvcnRjdXQga2V5YmluZGluZ3MgY3VycmVudGx5IGluIHVzZVxuICogQW4gb2JqZWN0IHdoZXJlIGtleXMgYXJlIHVuaXF1ZSBrZXlCaW5kaW5nX3NlbGVjdG9yIGFuZCB2YWx1ZXMgYXJlIHNob3J0Y3V0IG9iamVjdHMgKiovXG5mdW5jdGlvbiBnZXRLZXlCaW5kaW5nc1VzZWQoc2hvcnRjdXRPYmplY3RzKSB7XG4gICAgbGV0IGtleUJpbmRpbmdzVXNlZCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHNob3J0Y3V0T2JqZWN0cykuZm9yRWFjaCgoc2hvcnRjdXQpID0+IHtcbiAgICAgICAgT2JqZWN0LmtleXMoc2hvcnRjdXRPYmplY3RzW3Nob3J0Y3V0XS5rZXlzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRha2VuQnkgPSBuZXcgVGFrZW5CeU9iamVjdChzaG9ydGN1dE9iamVjdHNbc2hvcnRjdXRdKTtcbiAgICAgICAgICAgIHRha2VuQnkudGFrZW5CeUtleSA9IGtleTtcbiAgICAgICAgICAgIGtleUJpbmRpbmdzVXNlZFtzaG9ydGN1dE9iamVjdHNbc2hvcnRjdXRdLmtleXNba2V5XS5qb2luKCcgJykgK1xuICAgICAgICAgICAgICAgICdfJyArXG4gICAgICAgICAgICAgICAgc2hvcnRjdXRPYmplY3RzW3Nob3J0Y3V0XS5zZWxlY3Rvcl0gPSB0YWtlbkJ5O1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4ga2V5QmluZGluZ3NVc2VkO1xufVxuLyoqIFRvcCBsZXZlbCBSZWFjdCBjb21wb25lbnQgZm9yIHdpZGdldCAqL1xuZXhwb3J0IGNsYXNzIFNob3J0Y3V0VUkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgLyoqIFNldCB0aGUgY3VycmVudCBzZWFjaCBxdWVyeSAqL1xuICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaFF1ZXJ5ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWFyY2hRdWVyeTogZXZlbnQudGFyZ2V0Wyd2YWx1ZSddXG4gICAgICAgICAgICB9LCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFNob3J0Y3V0TGlzdDogdGhpcy5zZWFyY2hGaWx0ZXJTaG9ydGN1dHModGhpcy5zdGF0ZS5zaG9ydGN1dExpc3QpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0U2hvcnRjdXRzKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBSZXNldCBhbGwgc2hvcnRjdXRzIHRvIHRoZWlyIGRlZmF1bHRzICovXG4gICAgICAgIHRoaXMucmVzZXRTaG9ydGN1dHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHRoaXMucHJvcHMuZXh0ZXJuYWwuZ2V0QWxsU2hvcnRDdXRTZXR0aW5ncygpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MudXNlcikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnByb3BzLmV4dGVybmFsLnJlbW92ZVNob3J0Q3V0KGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoU2hvcnRjdXRMaXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBTZXQgbmV3IHNob3J0Y3V0IGZvciBjb21tYW5kLCByZWZyZXNoIHN0YXRlICovXG4gICAgICAgIHRoaXMuaGFuZGxlVXBkYXRlID0gYXN5bmMgKHNob3J0Y3V0T2JqZWN0LCBrZXlzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHRoaXMucHJvcHMuZXh0ZXJuYWwuZ2V0QWxsU2hvcnRDdXRTZXR0aW5ncygpO1xuICAgICAgICAgICAgY29uc3QgdXNlclNob3J0Y3V0cyA9IHNldHRpbmdzLnVzZXIuc2hvcnRjdXRzO1xuICAgICAgICAgICAgY29uc3QgbmV3VXNlclNob3J0Y3V0cyA9IFtdO1xuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBzaG9ydGN1dCBvZiB1c2VyU2hvcnRjdXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0Y3V0Wydjb21tYW5kJ10gPT09IHNob3J0Y3V0T2JqZWN0LmNvbW1hbmROYW1lICYmXG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0WydzZWxlY3RvciddID09PSBzaG9ydGN1dE9iamVjdC5zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyU2hvcnRjdXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogc2hvcnRjdXRbJ2NvbW1hbmQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBzaG9ydGN1dFsnc2VsZWN0b3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IGtleXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1VzZXJTaG9ydGN1dHMucHVzaChzaG9ydGN1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIG5ld1VzZXJTaG9ydGN1dHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHNob3J0Y3V0T2JqZWN0LmNvbW1hbmROYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvcjogc2hvcnRjdXRPYmplY3Quc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IGtleXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHNldHRpbmdzLnNldCgnc2hvcnRjdXRzJywgbmV3VXNlclNob3J0Y3V0cyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoU2hvcnRjdXRMaXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBEZWxldGUgc2hvcnRjdXQgZm9yIGNvbW1hbmQsIHJlZnJlc2ggc3RhdGUgKi9cbiAgICAgICAgdGhpcy5kZWxldGVTaG9ydGN1dCA9IGFzeW5jIChzaG9ydGN1dE9iamVjdCwgc2hvcnRjdXRJZCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVVcGRhdGUoc2hvcnRjdXRPYmplY3QsIFsnJ10pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVmcmVzaFNob3J0Y3V0TGlzdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKiogUmVzZXQgYSBzcGVjaWZpYyBzaG9ydGN1dCB0byBpdHMgZGVmYXVsdCBzZXR0aW5ncyAqL1xuICAgICAgICB0aGlzLnJlc2V0U2hvcnRjdXQgPSBhc3luYyAoc2hvcnRjdXRPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgdGhpcy5wcm9wcy5leHRlcm5hbC5nZXRBbGxTaG9ydEN1dFNldHRpbmdzKCk7XG4gICAgICAgICAgICBjb25zdCB1c2VyU2hvcnRjdXRzID0gc2V0dGluZ3MudXNlci5zaG9ydGN1dHM7XG4gICAgICAgICAgICBjb25zdCBuZXdVc2VyU2hvcnRjdXRzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBzaG9ydGN1dCBvZiB1c2VyU2hvcnRjdXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0Y3V0Wydjb21tYW5kJ10gIT09IHNob3J0Y3V0T2JqZWN0LmNvbW1hbmROYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0WydzZWxlY3RvciddICE9PSBzaG9ydGN1dE9iamVjdC5zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyU2hvcnRjdXRzLnB1c2goc2hvcnRjdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHNldHRpbmdzLnNldCgnc2hvcnRjdXRzJywgbmV3VXNlclNob3J0Y3V0cyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoU2hvcnRjdXRMaXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBUb2dnbGVzIHNob3dpbmcgY29tbWFuZCBzZWxlY3RvcnMgKi9cbiAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RvcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1NlbGVjdG9yczogIXRoaXMuc3RhdGUuc2hvd1NlbGVjdG9ycyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqIFNldCB0aGUgY3VycmVudCBsaXN0IHNvcnQgb3JkZXIgKi9cbiAgICAgICAgdGhpcy51cGRhdGVTb3J0ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuc3RhdGUuY3VycmVudFNvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFNvcnQ6IHZhbHVlIH0sIHRoaXMuc29ydFNob3J0Y3V0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKiBTb3J0IHNob3J0Y3V0IGxpc3Qgc28gdGhhdCBhbiBlcnJvciByb3cgaXMgcmlnaHQgYmVsb3cgdGhlIG9uZSBjdXJyZW50bHkgYmVpbmcgc2V0ICovXG4gICAgICAgIHRoaXMuc29ydENvbmZsaWN0ID0gKG5ld1Nob3J0Y3V0LCB0YWtlbkJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaG9ydGN1dExpc3QgPSB0aGlzLnN0YXRlLmZpbHRlcmVkU2hvcnRjdXRMaXN0O1xuICAgICAgICAgICAgaWYgKHNob3J0Y3V0TGlzdC5maWx0ZXIoc2hvcnRjdXQgPT4gc2hvcnRjdXQuaWQgPT09ICdlcnJvcl9yb3cnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvclJvdyA9IG5ldyBFcnJvck9iamVjdCgpO1xuICAgICAgICAgICAgICAgIGVycm9yUm93LnRha2VuQnkgPSB0YWtlbkJ5O1xuICAgICAgICAgICAgICAgIGVycm9yUm93LmlkID0gJ2Vycm9yX3Jvdyc7XG4gICAgICAgICAgICAgICAgc2hvcnRjdXRMaXN0LnNwbGljZShzaG9ydGN1dExpc3QuaW5kZXhPZihuZXdTaG9ydGN1dCkgKyAxLCAwLCBlcnJvclJvdyk7XG4gICAgICAgICAgICAgICAgZXJyb3JSb3cuaGFzQ29uZmxpY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmaWx0ZXJlZFNob3J0Y3V0TGlzdDogc2hvcnRjdXRMaXN0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKiogUmVtb3ZlIGNvbmZsaWN0IGZsYWcgZnJvbSBhbGwgc2hvcnRjdXRzICovXG4gICAgICAgIHRoaXMuY2xlYXJDb25mbGljdHMgPSAoKSA9PiB7XG4gICAgICAgICAgICAvKiogUmVtb3ZlIGVycm9yIHJvdyAqL1xuICAgICAgICAgICAgY29uc3Qgc2hvcnRjdXRMaXN0ID0gdGhpcy5zdGF0ZS5maWx0ZXJlZFNob3J0Y3V0TGlzdC5maWx0ZXIoc2hvcnRjdXQgPT4gc2hvcnRjdXQuaWQgIT09ICdlcnJvcl9yb3cnKTtcbiAgICAgICAgICAgIHNob3J0Y3V0TGlzdC5mb3JFYWNoKChzaG9ydGN1dCkgPT4ge1xuICAgICAgICAgICAgICAgIHNob3J0Y3V0Lmhhc0NvbmZsaWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmaWx0ZXJlZFNob3J0Y3V0TGlzdDogc2hvcnRjdXRMaXN0IH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gKGV2ZW50LCBjb21tYW5kSURzKSA9PiB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogdGhpcy5wcm9wcy5leHRlcm5hbC5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbW1hbmQgb2YgY29tbWFuZElEcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHRNZW51LmFkZEl0ZW0oeyBjb21tYW5kIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHRNZW51Lm9wZW4oZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3J0Y3V0TGlzdDoge30sXG4gICAgICAgICAgICBmaWx0ZXJlZFNob3J0Y3V0TGlzdDogbmV3IEFycmF5KCksXG4gICAgICAgICAgICBzaG9ydGN1dHNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNlYXJjaFF1ZXJ5OiAnJyxcbiAgICAgICAgICAgIHNob3dTZWxlY3RvcnM6IGZhbHNlLFxuICAgICAgICAgICAgY3VycmVudFNvcnQ6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1VzZWQ6IHt9LFxuICAgICAgICAgICAgY29udGV4dE1lbnU6IHRoaXMucHJvcHMuZXh0ZXJuYWwuY3JlYXRlTWVudSgpXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKiBGZXRjaCBzaG9ydGN1dCBsaXN0IG9uIG1vdW50ICovXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZvaWQgdGhpcy5fcmVmcmVzaFNob3J0Y3V0TGlzdCgpO1xuICAgIH1cbiAgICAvKiogRmV0Y2ggc2hvcnRjdXQgbGlzdCBmcm9tIFNldHRpbmdSZWdpc3RyeSAgKi9cbiAgICBhc3luYyBfcmVmcmVzaFNob3J0Y3V0TGlzdCgpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXRzID0gYXdhaXQgdGhpcy5wcm9wcy5leHRlcm5hbC5nZXRBbGxTaG9ydEN1dFNldHRpbmdzKCk7XG4gICAgICAgIGNvbnN0IHNob3J0Y3V0T2JqZWN0cyA9IGdldFNob3J0Y3V0T2JqZWN0cyh0aGlzLnByb3BzLmV4dGVybmFsLCBzaG9ydGN1dHMpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3J0Y3V0TGlzdDogc2hvcnRjdXRPYmplY3RzLFxuICAgICAgICAgICAgZmlsdGVyZWRTaG9ydGN1dExpc3Q6IHRoaXMuc2VhcmNoRmlsdGVyU2hvcnRjdXRzKHNob3J0Y3V0T2JqZWN0cyksXG4gICAgICAgICAgICBzaG9ydGN1dHNGZXRjaGVkOiB0cnVlXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nc1VzZWQgPSBnZXRLZXlCaW5kaW5nc1VzZWQoc2hvcnRjdXRPYmplY3RzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBrZXlCaW5kaW5nc1VzZWQgfSk7XG4gICAgICAgICAgICB0aGlzLnNvcnRTaG9ydGN1dHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBGaWx0ZXIgc2hvcnRjdXQgbGlzdCB1c2luZyBjdXJyZW50IHNlYXJjaCBxdWVyeSAqL1xuICAgIHNlYXJjaEZpbHRlclNob3J0Y3V0cyhzaG9ydGN1dE9iamVjdHMpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRTaG9ydGN1dHMgPSBtYXRjaEl0ZW1zKHNob3J0Y3V0T2JqZWN0cywgdGhpcy5zdGF0ZS5zZWFyY2hRdWVyeSkubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pdGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkU2hvcnRjdXRzO1xuICAgIH1cbiAgICAvKiogU29ydCBzaG9ydGN1dCBsaXN0IHVzaW5nIGN1cnJlbnQgc29ydCBwcm9wZXJ0eSAgKi9cbiAgICBzb3J0U2hvcnRjdXRzKCkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dHMgPSB0aGlzLnN0YXRlLmZpbHRlcmVkU2hvcnRjdXRMaXN0O1xuICAgICAgICBsZXQgZmlsdGVyQ3JpdGVyYSA9IHRoaXMuc3RhdGUuY3VycmVudFNvcnQ7XG4gICAgICAgIGlmIChmaWx0ZXJDcml0ZXJhID09PSAnY29tbWFuZCcpIHtcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmEgPSAnbGFiZWwnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJDcml0ZXJhICE9PSAnJykge1xuICAgICAgICAgICAgc2hvcnRjdXRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wYXJlQSA9IGEuZ2V0KGZpbHRlckNyaXRlcmEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhcmVCID0gYi5nZXQoZmlsdGVyQ3JpdGVyYSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVBIDwgY29tcGFyZUIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb21wYXJlQSA+IGNvbXBhcmVCKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbJ2xhYmVsJ10gPCBiWydsYWJlbCddID8gLTEgOiBhWydsYWJlbCddID4gYlsnbGFiZWwnXSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmaWx0ZXJlZFNob3J0Y3V0TGlzdDogc2hvcnRjdXRzIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zaG9ydGN1dHNGZXRjaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFNob3J0Y3V0VUlTdHlsZSwgaWQ6IFwianAtc2hvcnRjdXR1aVwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBUb3BXaGl0ZXNwYWNlU3R5bGUgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvcE5hdiwgeyB1cGRhdGVTZWFyY2hRdWVyeTogdGhpcy51cGRhdGVTZWFyY2hRdWVyeSwgcmVzZXRTaG9ydGN1dHM6IHRoaXMucmVzZXRTaG9ydGN1dHMsIHRvZ2dsZVNlbGVjdG9yczogdGhpcy50b2dnbGVTZWxlY3RvcnMsIHNob3dTZWxlY3RvcnM6IHRoaXMuc3RhdGUuc2hvd1NlbGVjdG9ycywgdXBkYXRlU29ydDogdGhpcy51cGRhdGVTb3J0LCBjdXJyZW50U29ydDogdGhpcy5zdGF0ZS5jdXJyZW50U29ydCwgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGV4dGVybmFsOiB0aGlzLnByb3BzLmV4dGVybmFsIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaG9ydGN1dExpc3QsIHsgc2hvcnRjdXRzOiB0aGlzLnN0YXRlLmZpbHRlcmVkU2hvcnRjdXRMaXN0LCByZXNldFNob3J0Y3V0OiB0aGlzLnJlc2V0U2hvcnRjdXQsIGhhbmRsZVVwZGF0ZTogdGhpcy5oYW5kbGVVcGRhdGUsIGRlbGV0ZVNob3J0Y3V0OiB0aGlzLmRlbGV0ZVNob3J0Y3V0LCBzaG93U2VsZWN0b3JzOiB0aGlzLnN0YXRlLnNob3dTZWxlY3RvcnMsIGtleUJpbmRpbmdzVXNlZDogdGhpcy5zdGF0ZS5rZXlCaW5kaW5nc1VzZWQsIHNvcnRDb25mbGljdDogdGhpcy5zb3J0Q29uZmxpY3QsIGNsZWFyQ29uZmxpY3RzOiB0aGlzLmNsZWFyQ29uZmxpY3RzLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LCBlcnJvclNpemU6IHRoaXMucHJvcHMud2lkdGggPCA3NzUgPyAxIC8qIFNtYWxsICovIDogMCAvKiBSZWd1bGFyICovLCBjb250ZXh0TWVudTogdGhpcy5jb250ZXh0TWVudSwgZXh0ZXJuYWw6IHRoaXMucHJvcHMuZXh0ZXJuYWwgfSkpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaG9ydGN1dFVJLmpzLm1hcCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNsYXNzZXMgfSBmcm9tICd0eXBlc3R5bGUnO1xuaW1wb3J0IHsgQ2VsbFN0eWxlIH0gZnJvbSAnLi4vY29tcG9uZW50U3R5bGUvU2hvcnRjdXRJdGVtU3R5bGUnO1xuaW1wb3J0IHsgQWR2YW5jZWRPcHRpb25zQ29udGFpbmVyU3R5bGUsIEFkdmFuY2VkT3B0aW9uc0xpbmtTdHlsZSwgQWR2YW5jZWRPcHRpb25zU21hbGxTdHlsZSwgQWR2YW5jZWRPcHRpb25zU3R5bGUsIGFsdEljb25TdHlsZSwgY29tbWFuZEljb25TdHlsZSwgY29udHJvbEljb25TdHlsZSwgSGVhZGVyUm93Q29udGFpbmVyU3R5bGUsIEhlYWRlclJvd1N0eWxlLCBTZWFyY2hDb250YWluZXJTdHlsZSwgU2VhcmNoU3R5bGUsIFN5bWJvbHNSb3dTdHlsZSwgU3ltYm9sc1NtYWxsU3R5bGUsIFN5bWJvbHNTdHlsZSwgVG9wTmF2U3R5bGUsIFRvcFN0eWxlIH0gZnJvbSAnLi4vY29tcG9uZW50U3R5bGUvVG9wTmF2U3R5bGUnO1xuaW1wb3J0IHsgU2hvcnRjdXRUaXRsZUl0ZW0gfSBmcm9tICcuL1Nob3J0Y3V0VGl0bGVJdGVtJztcbmV4cG9ydCB2YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuc2hvd1NlbGVjdG9ycyA9ICdzaG9ydGN1dHVpOnNob3dTZWxlY3RvcnMnO1xuICAgIENvbW1hbmRJRHMucmVzZXRBbGwgPSAnc2hvcnRjdXR1aTpyZXNldEFsbCc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbmNsYXNzIFN5bWJvbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdldFJlZ3VsYXJTeW1ib2xzKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFN5bWJvbHNTdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU3ltYm9sc1Jvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIkNtZCBcXHUyMzE4XCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJBbHQgXFx1MjMyNVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiQ3RybCBcXHUyMzAzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJTaGlmdCBcXHUyMUU3XCIpKSkpO1xuICAgIH1cbiAgICBnZXRTbWFsbFN5bWJvbHMoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NlcyhTeW1ib2xzU3R5bGUsIFN5bWJvbHNTbWFsbFN0eWxlKSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU3ltYm9sc1Jvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJDbWQgXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBjb21tYW5kSWNvblN0eWxlIH0sIFwiXFx1MjMxOFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFsdCBcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGFsdEljb25TdHlsZSB9LCBcIlxcdTIzMjVcIikpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU3ltYm9sc1Jvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJDdHJsIFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogY29udHJvbEljb25TdHlsZSB9LCBcIlxcdTIzMDNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJTaGlmdCBcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJcXHUyMUU3XCIpKSkpO1xuICAgIH1cbiAgICBnZXRUaW55U3ltYm9scygpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc2VzKFN5bWJvbHNTdHlsZSwgU3ltYm9sc1NtYWxsU3R5bGUpIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBTeW1ib2xzUm93U3R5bGUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkNtZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlxcdTIzMThcIikpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU3ltYm9sc1Jvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBbHRcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJcXHUyMzI1XCIpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFN5bWJvbHNSb3dTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQ3RybFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlxcdTIzMDNcIikpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU3ltYm9sc1Jvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJTaGlmdFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlxcdTIxRTdcIikpKSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgMCAvKiBSZWd1bGFyICovOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlZ3VsYXJTeW1ib2xzKCk7XG4gICAgICAgICAgICBjYXNlIDEgLyogU21hbGwgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U21hbGxTeW1ib2xzKCk7XG4gICAgICAgICAgICBjYXNlIDIgLyogVGlueSAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW55U3ltYm9scygpO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgQWR2YW5jZWRPcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2l6ZSA9PT0gMCAvKiBSZWd1bGFyICovKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IEFkdmFuY2VkT3B0aW9uc0NvbnRhaW5lclN0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogQWR2YW5jZWRPcHRpb25zU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IEFkdmFuY2VkT3B0aW9uc0xpbmtTdHlsZSh0aGlzLnByb3BzLnNpemUpLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLnRvZ2dsZVNlbGVjdG9ycygpIH0sIHRoaXMucHJvcHMuc2hvd1NlbGVjdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmFucy5fXygnSGlkZSBTZWxlY3RvcnMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0cmFucy5fXygnU2hvdyBTZWxlY3RvcnMnKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBjbGFzc2VzKEFkdmFuY2VkT3B0aW9uc0xpbmtTdHlsZSh0aGlzLnByb3BzLnNpemUpKSwgb25DbGljazogKCkgPT4gdGhpcy5wcm9wcy5yZXNldFNob3J0Y3V0cygpIH0sIHRyYW5zLl9fKCdSZXNldCBBbGwnKSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNsYXNzZXMoQWR2YW5jZWRPcHRpb25zU3R5bGUsIEFkdmFuY2VkT3B0aW9uc1NtYWxsU3R5bGUpIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IEFkdmFuY2VkT3B0aW9uc0xpbmtTdHlsZSh0aGlzLnByb3BzLnNpemUpLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLnRvZ2dsZVNlbGVjdG9ycygpIH0sIHRoaXMucHJvcHMuc2hvd1NlbGVjdG9yc1xuICAgICAgICAgICAgICAgICAgICA/IHRyYW5zLl9fKCdIaWRlIFNlbGVjdG9ycycpXG4gICAgICAgICAgICAgICAgICAgIDogdHJhbnMuX18oJ1Nob3cgU2VsZWN0b3JzJykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBjbGFzc2VzKEFkdmFuY2VkT3B0aW9uc0xpbmtTdHlsZSh0aGlzLnByb3BzLnNpemUpKSwgb25DbGljazogKCkgPT4gdGhpcy5wcm9wcy5yZXNldFNob3J0Y3V0cygpIH0sIHRyYW5zLl9fKCdSZXNldCBBbGwnKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKiBSZWFjdCBjb21wb25lbnQgZm9yIHRvcCBuYXZpZ2F0aW9uICovXG5leHBvcnQgY2xhc3MgVG9wTmF2IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuZ2V0U2l6ZSA9ICh3aWR0aCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZHRoIDwgNzMwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIgLyogVGlueSAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZHRoIDwgMTI2MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxIC8qIFNtYWxsICovO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLyogUmVndWxhciAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRNZW51Q29tbWFuZHMoKTtcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5wcm9wcy5leHRlcm5hbC5jcmVhdGVNZW51KCk7XG4gICAgICAgIHRoaXMubWVudS5hZGRJdGVtKHsgY29tbWFuZDogQ29tbWFuZElEcy5zaG93U2VsZWN0b3JzIH0pO1xuICAgICAgICB0aGlzLm1lbnUuYWRkSXRlbSh7IGNvbW1hbmQ6IENvbW1hbmRJRHMucmVzZXRBbGwgfSk7XG4gICAgfVxuICAgIGFkZE1lbnVDb21tYW5kcygpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnByb3BzLmV4dGVybmFsLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZXh0ZXJuYWwuaGFzQ29tbWFuZChDb21tYW5kSURzLnNob3dTZWxlY3RvcnMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmV4dGVybmFsLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zaG93U2VsZWN0b3JzLCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdUb2dnbGUgU2VsZWN0b3JzJyksXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1RvZ2dsZSBjb21tYW5kIHNlbGVjdG9ycycpLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVTZWxlY3RvcnMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZXh0ZXJuYWwuaGFzQ29tbWFuZChDb21tYW5kSURzLnJlc2V0QWxsKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5leHRlcm5hbC5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVzZXRBbGwsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Jlc2V0IEFsbCcpLFxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZXNldCBhbGwgc2hvcnRjdXRzJyksXG4gICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJlc2V0U2hvcnRjdXRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2hvcnRDdXRUaXRsZUl0ZW0odGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBDZWxsU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2hvcnRjdXRUaXRsZUl0ZW0sIHsgdGl0bGU6IHRpdGxlLCB1cGRhdGVTb3J0OiB0aGlzLnByb3BzLnVwZGF0ZVNvcnQsIGFjdGl2ZTogdGhpcy5wcm9wcy5jdXJyZW50U29ydCB9KSkpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy5leHRlcm5hbC50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBUb3BTdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogVG9wTmF2U3R5bGUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFN5bWJvbHMsIHsgc2l6ZTogdGhpcy5nZXRTaXplKHRoaXMucHJvcHMud2lkdGgpIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFNlYXJjaENvbnRhaW5lclN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IG9uQ2hhbmdlOiBldmVudCA9PiB0aGlzLnByb3BzLnVwZGF0ZVNlYXJjaFF1ZXJ5KGV2ZW50KSwgY2xhc3NOYW1lOiBTZWFyY2hTdHlsZSwgcGxhY2Vob2xkZXI6IHRyYW5zLl9fKCdTZWFyY2gnKSB9KSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBZHZhbmNlZE9wdGlvbnMsIHsgc2l6ZTogdGhpcy5nZXRTaXplKHRoaXMucHJvcHMud2lkdGgpLCB0b2dnbGVTZWxlY3RvcnM6IHRoaXMucHJvcHMudG9nZ2xlU2VsZWN0b3JzLCBzaG93U2VsZWN0b3JzOiB0aGlzLnByb3BzLnNob3dTZWxlY3RvcnMsIHJlc2V0U2hvcnRjdXRzOiB0aGlzLnByb3BzLnJlc2V0U2hvcnRjdXRzLCBtZW51OiB0aGlzLm1lbnUsIHRyYW5zbGF0b3I6IHRoaXMucHJvcHMuZXh0ZXJuYWwudHJhbnNsYXRvciB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBIZWFkZXJSb3dDb250YWluZXJTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IEhlYWRlclJvd1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2hvcnRDdXRUaXRsZUl0ZW0odHJhbnMuX18oJ0NhdGVnb3J5JykpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNob3J0Q3V0VGl0bGVJdGVtKHRyYW5zLl9fKCdDb21tYW5kJykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBDZWxsU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGl0bGUtZGl2XCIgfSwgdHJhbnMuX18oJ1Nob3J0Y3V0JykpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTaG9ydEN1dFRpdGxlSXRlbSh0cmFucy5fXygnU291cmNlJykpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dTZWxlY3RvcnMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2hvcnRDdXRUaXRsZUl0ZW0odHJhbnMuX18oJ1NlbGVjdG9ycycpKSkpKSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VG9wTmF2LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHNob3J0Y3V0cy1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSwgU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElUcmFuc2xhdG9yLCBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IElGb3JtQ29tcG9uZW50UmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IENvbW1hbmRSZWdpc3RyeSB9IGZyb20gJ0BsdW1pbm8vY29tbWFuZHMnO1xuaW1wb3J0IHsgSlNPTkV4dCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IERpc3Bvc2FibGVTZXQgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAbHVtaW5vL2RvbXV0aWxzJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgcmVuZGVyU2hvcnRDdXQgfSBmcm9tICcuL3JlbmRlcmVyJztcbmZ1bmN0aW9uIGdldEV4dGVybmFsRm9ySnVweXRlckxhYihzZXR0aW5nUmVnaXN0cnksIGFwcCwgdHJhbnNsYXRvcikge1xuICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICBjb25zdCBzaG9ydGN1dFBsdWdpbkxvY2F0aW9uID0gJ0BqdXB5dGVybGFiL3Nob3J0Y3V0cy1leHRlbnNpb246c2hvcnRjdXRzJztcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2xhdG9yLFxuICAgICAgICBnZXRBbGxTaG9ydEN1dFNldHRpbmdzOiAoKSA9PiBzZXR0aW5nUmVnaXN0cnkucmVsb2FkKHNob3J0Y3V0UGx1Z2luTG9jYXRpb24pLFxuICAgICAgICByZW1vdmVTaG9ydEN1dDogKGtleSkgPT4gc2V0dGluZ1JlZ2lzdHJ5LnJlbW92ZShzaG9ydGN1dFBsdWdpbkxvY2F0aW9uLCBrZXkpLFxuICAgICAgICBjcmVhdGVNZW51OiAoKSA9PiBuZXcgTWVudSh7IGNvbW1hbmRzIH0pLFxuICAgICAgICBoYXNDb21tYW5kOiAoaWQpID0+IGNvbW1hbmRzLmhhc0NvbW1hbmQoaWQpLFxuICAgICAgICBhZGRDb21tYW5kOiAoaWQsIG9wdGlvbnMpID0+IGNvbW1hbmRzLmFkZENvbW1hbmQoaWQsIG9wdGlvbnMpLFxuICAgICAgICBnZXRMYWJlbDogKGlkKSA9PiBjb21tYW5kcy5sYWJlbChpZClcbiAgICB9O1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzaG9ydGN1dHMgZXh0ZW5zaW9uLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFNob3J0Y3V0IHZhbHVlcyBhcmUgc3RvcmVkIGluIHRoZSBzZXR0aW5nIHN5c3RlbS4gVGhlIGRlZmF1bHQgdmFsdWVzIGZvciBlYWNoXG4gKiBzaG9ydGN1dCBhcmUgcHJlc2V0IGluIHRoZSBzZXR0aW5ncyBzY2hlbWEgZmlsZSBvZiB0aGlzIGV4dGVuc2lvbi5cbiAqIEFkZGl0aW9uYWxseSwgZWFjaCBzaG9ydGN1dCBjYW4gYmUgaW5kaXZpZHVhbGx5IHNldCBieSB0aGUgZW5kIHVzZXIgYnlcbiAqIG1vZGlmeWluZyBpdHMgc2V0dGluZyAoZWl0aGVyIGluIHRoZSB0ZXh0IGVkaXRvciBvciBieSBtb2RpZnlpbmcgaXRzXG4gKiB1bmRlcmx5aW5nIEpTT04gc2NoZW1hIGZpbGUpLlxuICpcbiAqIFdoZW4gc2V0dGluZyBzaG9ydGN1dCBzZWxlY3RvcnMsIHRoZXJlIGFyZSB0d28gY29uY2VwdHMgdG8gY29uc2lkZXI6XG4gKiBzcGVjaWZpY2l0eSBhbmQgbWF0Y2hhYmlsaXR5LiBUaGVzZSB0d28gaW50ZXJhY3QgaW4gc29tZXRpbWVzXG4gKiBjb3VudGVyaW50dWl0aXZlIHdheXMuIEtleWJvYXJkIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIGZyb20gYW4gZWxlbWVudCBhbmRcbiAqIHRoZXkgcHJvcGFnYXRlIHVwIHRoZSBET00gdW50aWwgdGhleSByZWFjaCB0aGUgYGRvY3VtZW50RWxlbWVudGAgKGA8Ym9keT5gKS5cbiAqXG4gKiBXaGVuIGEgcmVnaXN0ZXJlZCBzaG9ydGN1dCBzZXF1ZW5jZSBpcyBmaXJlZCwgdGhlIHNob3J0Y3V0IG1hbmFnZXIgY2hlY2tzXG4gKiB0aGUgbm9kZSB0aGF0IGZpcmVkIHRoZSBldmVudCBhbmQgZWFjaCBvZiBpdHMgYW5jZXN0b3JzIHVudGlsIGEgbm9kZSBtYXRjaGVzXG4gKiBvbmUgb3IgbW9yZSByZWdpc3RlcmVkIHNlbGVjdG9ycy4gVGhlICpmaXJzdCogbWF0Y2hpbmcgc2VsZWN0b3IgaW4gdGhlXG4gKiBjaGFpbiBvZiBhbmNlc3RvcnMgd2lsbCBpbnZva2UgdGhlIHNob3J0Y3V0IGhhbmRsZXIgYW5kIHRoZSB0cmF2ZXJzYWwgd2lsbFxuICogZW5kIGF0IHRoYXQgcG9pbnQuIElmIGEgbm9kZSBtYXRjaGVzIG1vcmUgdGhhbiBvbmUgc2VsZWN0b3IsIHRoZSBoYW5kbGVyIGZvclxuICogd2hpY2hldmVyIHNlbGVjdG9yIGlzIG1vcmUgKnNwZWNpZmljKiBmaXJlcy5cbiAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyNzcGVjaWZpY2l0eVxuICpcbiAqIFRoZSBwcmFjdGljYWwgY29uc2VxdWVuY2Ugb2YgdGhpcyBpcyB0aGF0IGEgdmVyeSBicm9hZGx5IG1hdGNoaW5nIHNlbGVjdG9yLFxuICogZS5nLiBgJyonYCBvciBgJ2RpdidgIG1heSBtYXRjaCBhbmQgdGhlcmVmb3JlIGludm9rZSBhIGhhbmRsZXIgKmJlZm9yZSogYVxuICogbW9yZSBzcGVjaWZpYyBzZWxlY3Rvci4gVGhlIG1vc3QgY29tbW9uIHBpdGZhbGwgaXMgdG8gdXNlIHRoZSB1bml2ZXJzYWxcbiAqIChgJyonYCkgc2VsZWN0b3IuIEZvciBhbG1vc3QgYW55IHVzZSBjYXNlIHdoZXJlIGEgZ2xvYmFsIGtleWJvYXJkIHNob3J0Y3V0IGlzXG4gKiByZXF1aXJlZCwgdXNpbmcgdGhlIGAnYm9keSdgIHNlbGVjdG9yIGlzIG1vcmUgYXBwcm9wcmlhdGUuXG4gKi9cbmNvbnN0IHNob3J0Y3V0cyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3Nob3J0Y3V0cy1leHRlbnNpb246c2hvcnRjdXRzJyxcbiAgICByZXF1aXJlczogW0lTZXR0aW5nUmVnaXN0cnldLFxuICAgIG9wdGlvbmFsOiBbSVRyYW5zbGF0b3IsIElGb3JtQ29tcG9uZW50UmVnaXN0cnldLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCByZWdpc3RyeSwgdHJhbnNsYXRvciwgZWRpdG9yUmVnaXN0cnkpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRvcl8gPSB0cmFuc2xhdG9yICE9PSBudWxsICYmIHRyYW5zbGF0b3IgIT09IHZvaWQgMCA/IHRyYW5zbGF0b3IgOiBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yXy5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgbGV0IGNhbm9uaWNhbDtcbiAgICAgICAgbGV0IGxvYWRlZCA9IHt9O1xuICAgICAgICBpZiAoZWRpdG9yUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIGVkaXRvclJlZ2lzdHJ5LmFkZFJlbmRlcmVyKCdzaG9ydGN1dHMnLCAocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyU2hvcnRDdXQoT2JqZWN0LmFzc2lnbih7IGV4dGVybmFsOiBnZXRFeHRlcm5hbEZvckp1cHl0ZXJMYWIocmVnaXN0cnksIGFwcCwgdHJhbnNsYXRvcl8pIH0sIHByb3BzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUG9wdWxhdGUgdGhlIHBsdWdpbidzIHNjaGVtYSBkZWZhdWx0cy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlKHNjaGVtYSkge1xuICAgICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBhcHAuY29tbWFuZHMubGlzdENvbW1hbmRzKCkuam9pbignXFxuJyk7XG4gICAgICAgICAgICBsb2FkZWQgPSB7fTtcbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzLnNob3J0Y3V0cy5kZWZhdWx0ID0gT2JqZWN0LmtleXMocmVnaXN0cnkucGx1Z2lucylcbiAgICAgICAgICAgICAgICAubWFwKHBsdWdpbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRjdXRzID0gcmVnaXN0cnkucGx1Z2luc1twbHVnaW5dLnNjaGVtYVsnanVweXRlci5sYWIuc2hvcnRjdXRzJ10gfHwgW107XG4gICAgICAgICAgICAgICAgbG9hZGVkW3BsdWdpbl0gPSBzaG9ydGN1dHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3J0Y3V0cztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNvbmNhdChbc2NoZW1hLnByb3BlcnRpZXMuc2hvcnRjdXRzLmRlZmF1bHRdKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBsYXRmb3JtLklTX01BQykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdCh2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcGxhdGZvcm0gaXMgbm90IE1hY09TLCByZW1vdmUgYWxsIHNob3J0Y3V0cyBjb250YWluaW5nIENtZFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyB0aGV5IHdpbGwgYmUgbW9kaWZpZWQ7IGUuZy4gYENtZCBBYCBiZWNvbWVzIGBBYFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdCh2YWwuZmlsdGVyKHNob3J0Y3V0ID0+ICFzaG9ydGN1dC5rZXlzLnNvbWUoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY21kIH0gPSBDb21tYW5kUmVnaXN0cnkucGFyc2VLZXlzdHJva2Uoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10pIC8vIGZsYXR0ZW4gb25lIGxldmVsXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuY29tbWFuZC5sb2NhbGVDb21wYXJlKGIuY29tbWFuZCkpO1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMuc2hvcnRjdXRzLmRlc2NyaXB0aW9uID0gdHJhbnMuX18oYE5vdGU6IFRvIGRpc2FibGUgYSBzeXN0ZW0gZGVmYXVsdCBzaG9ydGN1dCxcbmNvcHkgaXQgdG8gVXNlciBQcmVmZXJlbmNlcyBhbmQgYWRkIHRoZVxuXCJkaXNhYmxlZFwiIGtleSwgZm9yIGV4YW1wbGU6XG57XG4gICAgXCJjb21tYW5kXCI6IFwiYXBwbGljYXRpb246YWN0aXZhdGUtbmV4dC10YWJcIixcbiAgICBcImtleXNcIjogW1xuICAgICAgICBcIkN0cmwgU2hpZnQgXVwiXG4gICAgXSxcbiAgICBcInNlbGVjdG9yXCI6IFwiYm9keVwiLFxuICAgIFwiZGlzYWJsZWRcIjogdHJ1ZVxufVxuXG5MaXN0IG9mIGNvbW1hbmRzIGZvbGxvd2VkIGJ5IGtleWJvYXJkIHNob3J0Y3V0czpcbiUxXG5cbkxpc3Qgb2Yga2V5Ym9hcmQgc2hvcnRjdXRzOmAsIGNvbW1hbmRzKTtcbiAgICAgICAgfVxuICAgICAgICByZWdpc3RyeS5wbHVnaW5DaGFuZ2VkLmNvbm5lY3QoYXN5bmMgKHNlbmRlciwgcGx1Z2luKSA9PiB7XG4gICAgICAgICAgICBpZiAocGx1Z2luICE9PSBzaG9ydGN1dHMuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcGx1Z2luIGNoYW5nZWQgaXRzIHNob3J0Y3V0cywgcmVsb2FkIGV2ZXJ5dGhpbmcuXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkU2hvcnRjdXRzID0gbG9hZGVkW3BsdWdpbl07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2hvcnRjdXRzID0gcmVnaXN0cnkucGx1Z2luc1twbHVnaW5dLnNjaGVtYVsnanVweXRlci5sYWIuc2hvcnRjdXRzJ10gfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKG9sZFNob3J0Y3V0cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgICFKU09ORXh0LmRlZXBFcXVhbChvbGRTaG9ydGN1dHMsIG5ld1Nob3J0Y3V0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fub25pY2FsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVnaXN0cnkucmVsb2FkKHNob3J0Y3V0cy5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gVHJhbnNmb3JtIHRoZSBwbHVnaW4gb2JqZWN0IHRvIHJldHVybiBkaWZmZXJlbnQgc2NoZW1hIHRoYW4gdGhlIGRlZmF1bHQuXG4gICAgICAgIHJlZ2lzdHJ5LnRyYW5zZm9ybShzaG9ydGN1dHMuaWQsIHtcbiAgICAgICAgICAgIGNvbXBvc2U6IHBsdWdpbiA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgb3ZlcnJpZGUgdGhlIGNhbm9uaWNhbCBzY2hlbWEgdGhlIGZpcnN0IHRpbWUuXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5vbmljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fub25pY2FsID0gSlNPTkV4dC5kZWVwQ29weShwbHVnaW4uc2NoZW1hKTtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGUoY2Fub25pY2FsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdHMgPSAoX2MgPSAoX2IgPSAoX2EgPSBjYW5vbmljYWwucHJvcGVydGllcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNob3J0Y3V0cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRlZmF1bHQpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0czogKF9kID0gcGx1Z2luLmRhdGEudXNlci5zaG9ydGN1dHMpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb3NpdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0czogU2V0dGluZ1JlZ2lzdHJ5LnJlY29uY2lsZVNob3J0Y3V0cyhkZWZhdWx0cywgdXNlci5zaG9ydGN1dHMpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwbHVnaW4uZGF0YSA9IHsgY29tcG9zaXRlLCB1c2VyIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmZXRjaDogcGx1Z2luID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG92ZXJyaWRlIHRoZSBjYW5vbmljYWwgc2NoZW1hIHRoZSBmaXJzdCB0aW1lLlxuICAgICAgICAgICAgICAgIGlmICghY2Fub25pY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbm9uaWNhbCA9IEpTT05FeHQuZGVlcENvcHkocGx1Z2luLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXRlKGNhbm9uaWNhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHBsdWdpbi5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBpZDogcGx1Z2luLmlkLFxuICAgICAgICAgICAgICAgICAgICByYXc6IHBsdWdpbi5yYXcsXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYTogY2Fub25pY2FsLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBwbHVnaW4udmVyc2lvblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gUmVwb3B1bGF0ZSB0aGUgY2Fub25pY2FsIHZhcmlhYmxlIGFmdGVyIHRoZSBzZXR0aW5nIHJlZ2lzdHJ5IGhhc1xuICAgICAgICAgICAgLy8gcHJlbG9hZGVkIGFsbCBpbml0aWFsIHBsdWdpbnMuXG4gICAgICAgICAgICBjYW5vbmljYWwgPSBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCByZWdpc3RyeS5sb2FkKHNob3J0Y3V0cy5pZCk7XG4gICAgICAgICAgICBQcml2YXRlLmxvYWRTaG9ydGN1dHMoY29tbWFuZHMsIHNldHRpbmdzLmNvbXBvc2l0ZSk7XG4gICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFByaXZhdGUubG9hZFNob3J0Y3V0cyhjb21tYW5kcywgc2V0dGluZ3MuY29tcG9zaXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTG9hZGluZyAke3Nob3J0Y3V0cy5pZH0gZmFpbGVkLmAsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHNob3J0Y3V0IHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBzaG9ydGN1dHM7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlcm5hbCBjb2xsZWN0aW9uIG9mIGN1cnJlbnRseSBsb2FkZWQgc2hvcnRjdXRzLlxuICAgICAqL1xuICAgIGxldCBkaXNwb3NhYmxlcztcbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBrZXlib2FyZCBzaG9ydGN1dHMgZnJvbSBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsb2FkU2hvcnRjdXRzKGNvbW1hbmRzLCBjb21wb3NpdGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzaG9ydGN1dHMgPSAoKF9hID0gY29tcG9zaXRlID09PSBudWxsIHx8IGNvbXBvc2l0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29tcG9zaXRlLnNob3J0Y3V0cykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pO1xuICAgICAgICBpZiAoZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgICAgIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwb3NhYmxlcyA9IHNob3J0Y3V0cy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gbm9ybWFsaXplT3B0aW9ucyh2YWwpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBhY2MuYWRkKGNvbW1hbmRzLmFkZEtleUJpbmRpbmcob3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgbmV3IERpc3Bvc2FibGVTZXQoKSk7XG4gICAgfVxuICAgIFByaXZhdGUubG9hZFNob3J0Y3V0cyA9IGxvYWRTaG9ydGN1dHM7XG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplIHBvdGVudGlhbCBrZXlib2FyZCBzaG9ydGN1dCBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9wdGlvbnModmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgaXNBcnJheSB9ID0gQXJyYXk7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gJ2NvbW1hbmQnIGluIHZhbHVlICYmXG4gICAgICAgICAgICAna2V5cycgaW4gdmFsdWUgJiZcbiAgICAgICAgICAgICdzZWxlY3RvcicgaW4gdmFsdWUgJiZcbiAgICAgICAgICAgIGlzQXJyYXkodmFsdWUua2V5cyk7XG4gICAgICAgIHJldHVybiB2YWxpZCA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNob3J0Y3V0VUkgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuZXhwb3J0IGNvbnN0IHJlbmRlclNob3J0Q3V0ID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2hvcnRjdXRVSSwgeyBleHRlcm5hbDogcHJvcHMuZXh0ZXJuYWwsIGhlaWdodDogMTAwMCwgd2lkdGg6IDEwMDAgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyZXIuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==