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
var AuthReducer = function (state, action) {
    switch (action.type) {
        case 'SIGN_IN': {
            var _a = action.payload, name_1 = _a.name, accessToken = _a.accessToken, refreshToken = _a.refreshToken, location_1 = _a.location;
            return __assign(__assign({}, state), { status: 'LOGGED', tokens: { accessToken: accessToken, refreshToken: refreshToken }, user: { name: name_1, location: location_1 } });
        }
        case 'SIGN_UP_COMPLETED': {
            var location_2 = action.payload.location;
            if (!state.user)
                throw new Error('User not logged in');
            return __assign(__assign({}, state), { user: __assign(__assign({}, state.user), { location: location_2 }) });
        }
        case 'SIGN_OUT':
            return __assign(__assign({}, state), { status: 'NOT_LOGGED', tokens: null, user: null });
    }
};
exports.default = AuthReducer;
