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
var msw_1 = require("msw");
var signin_form_1 = require("./signin-form");
var server_1 = require("@/test/msw/server");
var test_utils_1 = require("@/test/test-utils");
var mockShow = jest.fn();
jest.mock('native-base', function () { return (__assign(__assign({}, jest.requireActual('native-base')), { useToast: function () { return ({
        show: mockShow,
        isActive: function () { return false; },
    }); } })); });
var mockSignIn = jest.fn();
jest.mock('@/hooks/use-auth-provider', function () { return ({
    useAuth: jest.fn(function () { return ({
        signIn: mockSignIn,
    }); }),
}); });
describe('SignIn Form', function () {
    describe('when the sign in succeeds', function () {
        it('logs the user in', function () { return __awaiter(void 0, void 0, void 0, function () {
            var emailField, passwordField, submitButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, test_utils_1.renderWithProviders)(<signin_form_1.SignInForm />);
                        emailField = test_utils_1.screen.getByPlaceholderText(/email/i);
                        passwordField = test_utils_1.screen.getByPlaceholderText(/senha/i);
                        submitButton = test_utils_1.screen.getByRole('button', { name: /entrar/i });
                        test_utils_1.fireEvent.changeText(emailField, 'john@email.com');
                        test_utils_1.fireEvent.changeText(passwordField, '12345678');
                        return [4 /*yield*/, (0, test_utils_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    test_utils_1.fireEvent.press(submitButton);
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        expect(mockSignIn).toHaveBeenCalledTimes(1);
                        expect(mockSignIn).toHaveBeenCalledWith({
                            accessToken: '123',
                            refreshToken: 'abc',
                            name: 'John Due',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when the sign in fails', function () {
        it('displays an error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var emailField, passwordField, submitButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        server_1.server.use(msw_1.http.post('*/api/v1/auth/signIn', function () {
                            return msw_1.HttpResponse.json({
                                message: 'Wrong email or password',
                            }, { status: 400 });
                        }));
                        (0, test_utils_1.renderWithProviders)(<signin_form_1.SignInForm />);
                        emailField = test_utils_1.screen.getByPlaceholderText(/email/i);
                        passwordField = test_utils_1.screen.getByPlaceholderText(/senha/i);
                        submitButton = test_utils_1.screen.getByRole('button', { name: /entrar/i });
                        test_utils_1.fireEvent.changeText(emailField, 'john@email.com');
                        test_utils_1.fireEvent.changeText(passwordField, '12345678');
                        return [4 /*yield*/, (0, test_utils_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    test_utils_1.fireEvent.press(submitButton);
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_utils_1.waitFor)(function () {
                                return expect(mockShow).toHaveBeenNthCalledWith(1, {
                                    title: 'Wrong email or password',
                                    variant: 'solid',
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
