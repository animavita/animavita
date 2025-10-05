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
var react_native_1 = require("@testing-library/react-native");
var native_base_1 = require("native-base");
var react_hook_form_1 = require("react-hook-form");
var use_form_validation_hook_1 = require("./use-form-validation.hook");
var use_locale_1 = require("@/hooks/use-locale");
jest.mock('@/hooks/use-locale');
jest.mock('native-base');
jest.mock('react-hook-form');
// eslint-disable-next-line react-hooks/rules-of-hooks
var setup = function () { return (0, use_form_validation_hook_1.default)('adoption', 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES'); };
var useLocaleReturnedValue = {
    // @ts-ignore
    t: function (key) { return key; },
};
describe('mountErrorMessage', function () {
    it('returns error message', function () {
        expect((0, use_form_validation_hook_1.mountErrorMessage)('name', 'any.required')).toBe('NAME_REQUIRED');
    });
});
describe('useFormValidation', function () {
    beforeEach(jest.clearAllMocks);
    describe('when validateField is called', function () {
        describe('when field is valid', function () {
            it('returns validateField as true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest.mocked(use_locale_1.default).mockReturnValue(useLocaleReturnedValue);
                            jest
                                .mocked(native_base_1.useToast)
                                .mockReturnValue(__assign(__assign({}, (0, native_base_1.useToast)()), { show: jest.fn(), isActive: jest.fn() }));
                            jest.mocked(react_hook_form_1.useFormContext).mockReturnValue(__assign(__assign({}, (0, react_hook_form_1.useFormContext)()), { trigger: function () { return Promise.resolve(true); }, getFieldState: function () {
                                    return { error: { type: 'any.required' } };
                                } }));
                            result = (0, react_native_1.renderHook)(setup).result;
                            return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var isValid;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, result.current.validateField('name')];
                                            case 1:
                                                isValid = _a.sent();
                                                expect(isValid).toBeTruthy();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('when field is invalid', function () {
            it('returns validateField as false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest.mocked(use_locale_1.default).mockReturnValue(useLocaleReturnedValue);
                            jest
                                .mocked(native_base_1.useToast)
                                .mockReturnValue(__assign(__assign({}, (0, native_base_1.useToast)()), { show: jest.fn(), isActive: jest.fn() }));
                            jest.mocked(react_hook_form_1.useFormContext).mockReturnValue(__assign(__assign({}, (0, react_hook_form_1.useFormContext)()), { trigger: function () { return Promise.resolve(false); }, formState: {
                                    errors: { name: { type: 'any.required' } },
                                } }));
                            result = (0, react_native_1.renderHook)(setup).result;
                            return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var isValid;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, result.current.validateField('name')];
                                            case 1:
                                                isValid = _a.sent();
                                                expect(isValid).toBeFalsy();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('whe isActive returns false', function () {
                it('calls show toast', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var show, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                show = jest.fn();
                                jest.mocked(use_locale_1.default).mockReturnValue(useLocaleReturnedValue);
                                jest.mocked(native_base_1.useToast).mockReturnValue(__assign(__assign({}, (0, native_base_1.useToast)()), { show: show, isActive: function () { return false; } }));
                                jest.mocked(react_hook_form_1.useFormContext).mockReturnValue(__assign(__assign({}, (0, react_hook_form_1.useFormContext)()), { trigger: function () { return Promise.resolve(false); }, getFieldState: function () {
                                        return { error: { type: 'any.required' } };
                                    } }));
                                result = (0, react_native_1.renderHook)(setup).result;
                                return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, result.current.validateField('name')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                expect(show).toBeCalledWith({
                                    description: 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES.NAME_REQUIRED',
                                    id: 'adoption-form-toast',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('whe isActive returns true', function () {
                it('does calls show toast', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var show, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                show = jest.fn();
                                jest.mocked(use_locale_1.default).mockReturnValue(useLocaleReturnedValue);
                                jest.mocked(native_base_1.useToast).mockReturnValue(__assign(__assign({}, (0, native_base_1.useToast)()), { show: show, isActive: function () { return true; } }));
                                jest.mocked(react_hook_form_1.useFormContext).mockReturnValue(__assign(__assign({}, (0, react_hook_form_1.useFormContext)()), { trigger: function () { return Promise.resolve(false); }, getFieldState: function () {
                                        return { error: { type: 'any.required' } };
                                    } }));
                                result = (0, react_native_1.renderHook)(setup).result;
                                return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, result.current.validateField('name')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                expect(show).not.toBeCalled();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
