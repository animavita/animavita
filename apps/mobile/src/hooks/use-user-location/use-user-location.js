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
exports.Warnings = void 0;
var Location = require("expo-location");
var react_1 = require("react");
var react_native_1 = require("react-native");
var reverse_geocoding_1 = require("@/services/reverse-geocoding");
var Warnings;
(function (Warnings) {
    Warnings[Warnings["GPS_DISABLED"] = 0] = "GPS_DISABLED";
    Warnings[Warnings["LOCATION_REQUIRED"] = 1] = "LOCATION_REQUIRED";
})(Warnings || (exports.Warnings = Warnings = {}));
var useUserLocation = function () {
    var _a = (0, react_1.useState)(), address = _a[0], setAddress = _a[1];
    var _b = (0, react_1.useState)(), coords = _b[0], setCoords = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(), errorMessage = _d[0], setErrorMessage = _d[1];
    var _e = (0, react_1.useState)(), warning = _e[0], setWarning = _e[1];
    var getLocation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, granted, canAskAgain, hasServicesEnabled, _b, latitude, longitude, userAddress, response, error_1, addresses, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, 12, 13]);
                    setIsLoading(true);
                    return [4 /*yield*/, Location.requestForegroundPermissionsAsync()];
                case 1:
                    _a = _c.sent(), granted = _a.granted, canAskAgain = _a.canAskAgain;
                    return [4 /*yield*/, Location.hasServicesEnabledAsync()];
                case 2:
                    hasServicesEnabled = _c.sent();
                    if (!hasServicesEnabled) {
                        setWarning(Warnings.GPS_DISABLED);
                        return [2 /*return*/];
                    }
                    if (!granted && !canAskAgain) {
                        setWarning(Warnings.LOCATION_REQUIRED);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Location.getCurrentPositionAsync()];
                case 3:
                    _b = (_c.sent()).coords, latitude = _b.latitude, longitude = _b.longitude;
                    setCoords({ latitude: latitude, longitude: longitude });
                    userAddress = void 0;
                    if (!(react_native_1.Platform.OS === 'web')) return [3 /*break*/, 8];
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, reverse_geocoding_1.reverseGeocoding)({
                            latitude: latitude,
                            longitude: longitude,
                        })];
                case 5:
                    response = _c.sent();
                    userAddress = response.data;
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    setErrorMessage(error_1.message);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, Location.reverseGeocodeAsync({
                        latitude: latitude,
                        longitude: longitude,
                    })];
                case 9:
                    userAddress = _c.sent();
                    _c.label = 10;
                case 10:
                    addresses = userAddress.map(function (address) { return ({
                        city: address.region,
                        state: address.subregion,
                    }); });
                    setAddress(addresses[0]);
                    return [3 /*break*/, 13];
                case 11:
                    error_2 = _c.sent();
                    setErrorMessage(error_2.message);
                    return [3 /*break*/, 13];
                case 12:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return {
        coords: coords,
        isLoading: isLoading,
        address: address,
        getLocation: getLocation,
        error: errorMessage,
        warning: warning,
    };
};
exports.default = useUserLocation;
