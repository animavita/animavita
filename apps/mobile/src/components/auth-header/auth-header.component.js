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
var AuthHeader = function (_a) {
    var action = _a.action, rest = __rest(_a, ["action"]);
    var theme = (0, native_base_1.useTheme)();
    return (<native_base_1.View marginY={20} {...rest}>
      <native_base_1.Heading fontSize="4xl" color={theme.colors.primary[600]}>
        Animavita
      </native_base_1.Heading>
      {!!action && <native_base_1.Text fontSize="2xl">{action}</native_base_1.Text>}
    </native_base_1.View>);
};
exports.default = AuthHeader;
