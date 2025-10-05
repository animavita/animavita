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
var native_base_1 = require("native-base");
var react_1 = require("react");
var status_bar_component_1 = require("@/components/status-bar/status-bar.component");
var use_locale_1 = require("@/hooks/use-locale");
var use_user_register_1 = require("@/hooks/use-user-register");
var use_navigation_1 = require("@/navigation/use-navigation");
var RoleSelectionScreen = function () {
    var t = (0, use_locale_1.default)().t;
    var _a = (0, use_user_register_1.default)(), complete = _a.complete, error = _a.error;
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    var toast = (0, native_base_1.useToast)();
    var _b = (0, react_1.useState)(null), selectedRole = _b[0], setSelectedRole = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var handleRoleSelection = function (role) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedRole(role);
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, complete({ role: role })];
                case 2:
                    _a.sent();
                    navigate('GeoLocation');
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    toast.show({
                        description: error || 'Erro ao definir sua função!',
                        status: 'error',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<native_base_1.Box flex="1" padding={8}>
      <status_bar_component_1.default />
      
      <native_base_1.VStack space={6} flex={1} justifyContent="center" alignItems="center">
        <native_base_1.Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {t('ROLE_SELECTION.TITLE')}
        </native_base_1.Text>
        
        <native_base_1.Text fontSize="md" textAlign="center" color="gray.600">
          {t('ROLE_SELECTION.SUBTITLE')}
        </native_base_1.Text>

        <native_base_1.VStack space={4} width="full" maxWidth="300px">
          <native_base_1.Button size="lg" onPress={function () { return handleRoleSelection('adopter'); }} isLoading={isLoading && selectedRole === 'adopter'} disabled={isLoading} variant={selectedRole === 'adopter' ? 'solid' : 'outline'}>
            {t('ROLE_SELECTION.ADOPTER')}
          </native_base_1.Button>

          <native_base_1.Button size="lg" onPress={function () { return handleRoleSelection('owner'); }} isLoading={isLoading && selectedRole === 'owner'} disabled={isLoading} variant={selectedRole === 'owner' ? 'solid' : 'outline'}>
            {t('ROLE_SELECTION.OWNER')}
          </native_base_1.Button>
        </native_base_1.VStack>
      </native_base_1.VStack>
    </native_base_1.Box>);
};
exports.default = RoleSelectionScreen;
