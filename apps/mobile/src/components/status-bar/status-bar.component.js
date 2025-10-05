"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var theme_1 = require("@/theme");
var AppStatusBar = function () {
    return <native_base_1.StatusBar barStyle="dark-content" backgroundColor={theme_1.default.colors.white}/>;
};
exports.default = AppStatusBar;
