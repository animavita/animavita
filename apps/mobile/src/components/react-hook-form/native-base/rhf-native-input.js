"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var RHFNativeBaseInput = function (_a) {
    var control = _a.control, name = _a.name, input = _a.input, label = _a.label, props = __rest(_a, ["control", "name", "input", "label"]);
    var _b = (0, react_hook_form_1.useController)({ control: control, name: name }), field = _b.field, fieldState = _b.fieldState;
    return (<native_base_1.FormControl>
      {!!label && <native_base_1.FormControl.Label>{label}</native_base_1.FormControl.Label>}
      <native_base_1.Input {...input} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} isInvalid={fieldState.invalid}/>
    </native_base_1.FormControl>);
};
exports.default = RHFNativeBaseInput;
