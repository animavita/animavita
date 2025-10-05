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
var react_query_1 = require("@tanstack/react-query");
var native_base_1 = require("native-base");
var use_locale_1 = require("../use-locale");
var use_navigation_1 = require("@/navigation/use-navigation");
var adoptions_1 = require("@/services/adoptions");
var pets_1 = require("@/services/pets");
var query_keys_1 = require("@/services/query-keys");
var usePets = function () {
    var _a;
    var t = (0, use_locale_1.default)().t;
    var navigation = (0, use_navigation_1.useNavigation)();
    var toast = (0, native_base_1.useToast)();
    var client = (0, react_query_1.useQueryClient)();
    var query = (0, react_query_1.useQuery)({
        queryKey: [query_keys_1.QUERY_KEYS.getMyPets],
        queryFn: pets_1.getMyPets,
    });
    var mutation = (0, react_query_1.useMutation)(adoptions_1.saveOrCreate, {
        onSuccess: function () {
            client.invalidateQueries([query_keys_1.QUERY_KEYS.getMyPets]);
            navigation.navigate('Home');
        },
        onError: function () {
            toast.show({ description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.GENERIC_ERROR') });
        },
    });
    var saveOrCreatePet = function (pet) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mutation.mutateAsync(pet)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return {
        loading: query.isFetching,
        myPets: ((_a = query.data) === null || _a === void 0 ? void 0 : _a.data) || [],
        saving: mutation.isLoading,
        saveOrCreatePet: saveOrCreatePet,
    };
};
exports.default = usePets;
