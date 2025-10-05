"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseURL = void 0;
var axios_1 = require("axios");
var expo_constants_1 = require("expo-constants");
var react_native_1 = require("react-native");
var apiUrl = (_b = (_a = expo_constants_1.default === null || expo_constants_1.default === void 0 ? void 0 : expo_constants_1.default.expoConfig) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b.apiUrl;
var getBaseUrl = function () {
    if (process.env.NODE_ENV === 'test')
        return 'http://localhost';
    if (typeof apiUrl === 'object')
        return apiUrl[react_native_1.Platform.OS];
    return apiUrl;
};
exports.baseURL = getBaseUrl();
var client = axios_1.default.create({
    baseURL: "".concat(exports.baseURL, "/api/v1"),
});
exports.default = client;
