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
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var auth_provider_reducer_1 = require("./auth-provider.reducer");
var secure_store_1 = require("@/helpers/secure-store");
var query_keys_1 = require("@/services/query-keys");
var sign_in_1 = require("@/services/sign-in");
var user_1 = require("@/services/user");
var useAuthActions = function () {
    var _a = (0, react_1.useReducer)(auth_provider_reducer_1.default, {
        tokens: null,
        user: null,
        status: 'IDLE',
    }), state = _a[0], dispatch = _a[1];
    var userInfoQuery = (0, react_query_1.useQuery)({
        queryKey: [query_keys_1.QUERY_KEYS.getUserInfo],
        queryFn: user_1.getCurrentUserInfo,
        enabled: false,
    });
    (0, react_1.useEffect)(function () {
        var initState = function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokens, data, _a, name_1, location_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, (0, secure_store_1.getUserCredentials)()];
                    case 1:
                        tokens = _b.sent();
                        if (!(tokens !== null)) return [3 /*break*/, 5];
                        (0, sign_in_1.persistUserToken)(tokens.accessToken);
                        return [4 /*yield*/, userInfoQuery.refetch()];
                    case 2:
                        data = (_b.sent()).data;
                        if (!!data) return [3 /*break*/, 4];
                        return [4 /*yield*/, authActions.signOut()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                    case 4:
                        _a = data.data, name_1 = _a.name, location_1 = _a.location;
                        dispatch({
                            type: 'SIGN_IN',
                            payload: __assign(__assign({}, tokens), { name: name_1, location: location_1 }),
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        dispatch({ type: 'SIGN_OUT' });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        // catch error here
                        // Maybe sign_out user!
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        initState();
    }, []);
    var authActions = (0, react_1.useMemo)(function () { return ({
        signIn: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, sign_in_1.persistUserToken)(payload.accessToken);
                        dispatch({ type: 'SIGN_IN', payload: payload });
                        return [4 /*yield*/, (0, secure_store_1.saveUserCredentials)(payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        signOut: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, secure_store_1.removeUserCredentials)()];
                    case 1:
                        _a.sent();
                        dispatch({ type: 'SIGN_OUT' });
                        return [2 /*return*/];
                }
            });
        }); },
        completeSignUp: function (location) {
            dispatch({ type: 'SIGN_UP_COMPLETED', payload: { location: location } });
        },
    }); }, []);
    return {
        state: state,
        authActions: authActions,
    };
};
exports.default = useAuthActions;
