"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_i18next_1 = require("react-i18next");
var useLocale = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    return {
        t: t,
    };
};
exports.default = useLocale;
