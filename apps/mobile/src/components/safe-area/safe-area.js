"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var SafeArea = function (_a) {
    var children = _a.children;
    return <react_native_safe_area_context_1.SafeAreaView style={{ flex: 1 }}>{children}</react_native_safe_area_context_1.SafeAreaView>;
};
exports.default = SafeArea;
