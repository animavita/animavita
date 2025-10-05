"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initI18n = exports.resources = void 0;
var i18next_1 = require("i18next");
var react_i18next_1 = require("react-i18next");
var pt_BR_json_1 = require("@/i18n/locales/pt-BR.json");
exports.resources = {
    'pt-BR': {
        translation: pt_BR_json_1.default,
    },
};
var initI18n = function (language) {
    var i18nInstanceAlreadyStarted = !!i18next_1.default.language;
    if (!i18nInstanceAlreadyStarted) {
        i18next_1.default.use(react_i18next_1.initReactI18next).init({
            compatibilityJSON: 'v3',
            resources: exports.resources,
            lng: language,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
    }
    return i18next_1.default;
};
exports.initI18n = initI18n;
exports.default = i18next_1.default;
