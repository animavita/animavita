"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
var react_1 = require("react");
var auth_provider_1 = require("@/providers/auth-provider/auth-provider");
var useAuth = function () {
    var context = (0, react_1.useContext)(auth_provider_1.AuthContext);
    if (!context) {
        throw new Error('useAuth must be inside an AuthProvider with a value');
    }
    return context;
};
exports.useAuth = useAuth;
