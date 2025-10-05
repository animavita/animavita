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
var Delimiter = function (_a) {
    var children = _a.children, remainingProps = __rest(_a, ["children"]);
    return (<native_base_1.View marginX="6" marginY="4" {...remainingProps}>
      {children}
    </native_base_1.View>);
};
exports.default = Delimiter;
