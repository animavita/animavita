"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPets = void 0;
var http_client_1 = require("./http-client");
var getMyPets = function () {
    return http_client_1.default.get('/pets/my');
};
exports.getMyPets = getMyPets;
