"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
var msw_1 = require("msw");
exports.handlers = [
    msw_1.http.get('*/api/v1/pets/my', function () {
        return msw_1.HttpResponse.json([]);
    }),
    msw_1.http.post('*/api/v1/pets', function () {
        return msw_1.HttpResponse.json({
            name: 'Bob',
            gender: 'male',
            breed: 'pitbull',
            type: 'dog',
            age: 2,
            size: 'big',
            photos: [],
        });
    }),
    msw_1.http.post('*/api/v1/auth/signIn', function () {
        return msw_1.HttpResponse.json({
            accessToken: '123',
            refreshToken: 'abc',
            name: 'John Due',
        });
    }),
    msw_1.http.get('*/api/v1/auth/me', function () {
        return msw_1.HttpResponse.json({
            name: 'John',
        });
    }),
    msw_1.http.post('*/api/v1/auth/signUp', function () {
        return msw_1.HttpResponse.json({ accessToken: '123', refreshToken: 'abc', name: 'John' });
    }),
];
