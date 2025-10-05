"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
var react_1 = require("react");
// if on mobile, use-auth-actions.native.ts will be picked
var use_auth_actions_1 = require("./use-auth-actions");
exports.AuthContext = (0, react_1.createContext)({
    status: 'IDLE',
    tokens: null,
    user: null,
    signIn: function () { },
    signOut: function () { },
    completeSignUp: function () { },
});
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, use_auth_actions_1.default)(), state = _b.state, authActions = _b.authActions;
    return (<exports.AuthContext.Provider value={__assign(__assign({}, state), authActions)}>{children}</exports.AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
