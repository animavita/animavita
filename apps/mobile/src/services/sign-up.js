"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeSignUp = exports.signUp = void 0;
var http_client_1 = require("./http-client");
var signUp = function (user) {
    return http_client_1.default.post('/auth/signUp', user);
};
exports.signUp = signUp;
var completeSignUp = function (data) {
    return http_client_1.default.post('/auth/completeSignUp', data);
};
exports.completeSignUp = completeSignUp;
