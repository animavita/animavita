"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOrCreate = exports.getAllAdoptions = void 0;
var http_client_1 = require("./http-client");
var getAllAdoptions = function () {
    return http_client_1.default.get('/adoptions');
};
exports.getAllAdoptions = getAllAdoptions;
var saveOrCreate = function (adoption) {
    if ('id' in adoption) {
        return http_client_1.default.patch('/pets', adoption);
    }
    return http_client_1.default.post('/pets', adoption);
};
exports.saveOrCreate = saveOrCreate;
