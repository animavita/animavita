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
var pet_upload_photos_step_hooks_1 = require("./pet-upload-photos-step.hooks");
jest.mock('@/shared/image-picker', function () { return ({
    openImageLibrary: jest.fn(),
}); });
var SLOTS = [undefined, 'image1', undefined];
describe('usePetPhotosPicker', function () {
    beforeEach(jest.restoreAllMocks);
    it('returns initial images state and pickImage function', function () {
        var result = (0, react_native_1.renderHook)(function () { return (0, pet_upload_photos_step_hooks_1.usePetPhotosPicker)(); }).result;
        expect(result.current.images).toEqual([undefined, undefined, undefined]);
        expect(typeof result.current.pickImage).toBe('function');
    });
    it.each(SLOTS)('(%#) pickImage updates the images state', function (slot) { return __awaiter(void 0, void 0, void 0, function () {
        var index, result, imagePickerUtilMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = SLOTS.findIndex(function (item) { return item === slot; });
                    result = (0, react_native_1.renderHook)(function () { return (0, pet_upload_photos_step_hooks_1.usePetPhotosPicker)(); }).result;
                    imagePickerUtilMock = require('@/shared/image-picker');
                    imagePickerUtilMock.openImageLibrary.mockResolvedValueOnce(slot);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                result.current.pickImage(index)();
                                return [2 /*return*/];
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () { return expect(result.current.images[index]).toEqual(slot); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
