"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_2 = require("react-native");
var _1 = require(".");
var secure_store_1 = require("@/helpers/secure-store");
var test_utils_1 = require("@/test/test-utils");
jest.mock('@/helpers/secure-store', function () { return ({
    getUserCredentials: jest.fn(function () { return null; }),
}); });
var setup = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, test_utils_1.renderWithProviders)(<_1.AuthProvider>
      <_1.AuthContext.Consumer>
        {function (value) {
                    var _a = value.tokens || {}, accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                    var name = (value.user || {}).name;
                    return (<>
              <react_native_2.Text>access token: {accessToken}</react_native_2.Text>
              <react_native_2.Text>refresh token: {refreshToken}</react_native_2.Text>
              <react_native_2.Text>name: {name}</react_native_2.Text>
              <react_native_2.Text>status: {JSON.stringify(value.status)}</react_native_2.Text>
            </>);
                }}
      </_1.AuthContext.Consumer>
    </_1.AuthProvider>)];
    });
}); };
describe('AuthProvider native', function () {
    beforeEach(jest.clearAllMocks);
    it('user token/info is undefined by default', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setup();
                    expect(react_native_1.screen.getByText('access token:')).toBeTruthy();
                    expect(react_native_1.screen.getByText('refresh token:')).toBeTruthy();
                    expect(react_native_1.screen.getByText('name:')).toBeTruthy();
                    return [4 /*yield*/, (0, react_native_1.waitForElementToBeRemoved)(function () { return react_native_1.screen.getByText('status: "IDLE"'); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('status is IDLE by default', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setup();
                    expect(react_native_1.screen.getByText('status: "IDLE"')).toBeTruthy();
                    return [4 /*yield*/, (0, react_native_1.waitForElementToBeRemoved)(function () { return react_native_1.screen.getByText('status: "IDLE"'); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('if no token found', function () {
        it('logs the user out', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setup();
                        return [4 /*yield*/, (0, react_native_1.waitForElementToBeRemoved)(function () { return react_native_1.screen.getByText('status: "IDLE"'); })];
                    case 1:
                        _a.sent();
                        expect(react_native_1.screen.queryByText('status: "NOT_LOGGED"')).toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when the token is found', function () {
        it('logs the user in by storing their token', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secure_store_1.getUserCredentials.mockReturnValue({
                            accessToken: '123-abc',
                            refreshToken: 'abc-123',
                        });
                        setup();
                        return [4 /*yield*/, (0, react_native_1.waitForElementToBeRemoved)(function () { return react_native_1.screen.getByText('status: "IDLE"'); })];
                    case 1:
                        _a.sent();
                        expect(react_native_1.screen.queryByText('access token: 123-abc')).toBeOnTheScreen();
                        expect(react_native_1.screen.queryByText('refresh token: abc-123')).toBeOnTheScreen();
                        expect(react_native_1.screen.queryByText('name: John')).toBeOnTheScreen();
                        expect(react_native_1.screen.queryByText('status: "LOGGED"')).toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
