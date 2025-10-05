"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserInfo = void 0;
var http_client_1 = require("./http-client");
var getCurrentUserInfo = function () {
    return http_client_1.default.get('/auth/me');
};
exports.getCurrentUserInfo = getCurrentUserInfo;
