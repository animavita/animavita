"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistUserToken = exports.signInRequest = void 0;
var http_client_1 = require("./http-client");
var signInRequest = function (user) {
    return http_client_1.default.post('/auth/signIn', user);
};
exports.signInRequest = signInRequest;
var persistUserToken = function (token) {
    http_client_1.default.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
};
exports.persistUserToken = persistUserToken;
