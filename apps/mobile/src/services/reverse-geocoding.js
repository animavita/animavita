"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseGeocoding = void 0;
var http_client_1 = require("./http-client");
var reverseGeocoding = function (coord) {
    return http_client_1.default.get('/location', { params: coord });
};
exports.reverseGeocoding = reverseGeocoding;
