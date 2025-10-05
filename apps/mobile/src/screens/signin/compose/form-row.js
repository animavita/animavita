"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormRow = void 0;
var native_base_1 = require("native-base");
var FormRow = function (_a) {
    var children = _a.children;
    return <native_base_1.View marginY={2}>{children}</native_base_1.View>;
};
exports.FormRow = FormRow;
