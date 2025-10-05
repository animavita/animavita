"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var RHFNativeBaseListSelector = function (_a) {
    var name = _a.name, options = _a.options;
    var setValue = (0, react_hook_form_1.useFormContext)().setValue;
    var petTypeValue = (0, react_hook_form_1.useWatch)({ name: name });
    var changeValue = function (value) { return setValue(name, value); };
    return (<>
      {options.map(function (option) { return (<native_base_1.Button variant={option.value === petTypeValue ? 'solid' : 'outline'} marginY="2" key={option.value} onPress={function () { return changeValue(option.value); }}>
          {option.label}
        </native_base_1.Button>); })}
    </>);
};
exports.default = RHFNativeBaseListSelector;
