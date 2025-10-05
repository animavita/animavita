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
var localization_png_1 = require("@assets/localization.png");
var Location = require("expo-location");
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_native_1 = require("react-native");
var compose_1 = require("./compose");
var safe_area_1 = require("@/components/safe-area/safe-area");
var status_bar_component_1 = require("@/components/status-bar/status-bar.component");
var use_locale_1 = require("@/hooks/use-locale");
var use_profile_1 = require("@/hooks/use-profile");
var use_user_location_1 = require("@/hooks/use-user-location/use-user-location");
var use_user_register_1 = require("@/hooks/use-user-register/use-user.register");
var use_navigation_1 = require("@/navigation/use-navigation");
var theme_1 = require("@/theme");
var errorAlert = function (msg, onPress, text) {
    return react_native_1.Alert.alert('Error', msg, [
        {
            text: text,
            onPress: onPress,
            style: 'cancel',
        },
    ]);
};
var GetLocation = function () {
    var _a = (0, use_user_location_1.default)(), getLocation = _a.getLocation, address = _a.address, isLoading = _a.isLoading, warning = _a.warning, coords = _a.coords;
    var firstName = (0, use_profile_1.default)().firstName;
    var _b = (0, use_user_register_1.default)(), isRegistering = _b.isRegistering, error = _b.error, complete = _b.complete;
    var toast = (0, native_base_1.useToast)();
    var t = (0, use_locale_1.default)().t;
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    var onConfirmLocation = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!coords)
                        throw new Error('Coordinates not defined!');
                    return [4 /*yield*/, complete({ coordinates: coords })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onSkipLocation = function () {
        navigate('Home');
    };
    (0, react_1.useEffect)(function () {
        if (error)
            toast.show({ title: error, variant: 'solid' });
    }, [error]);
    (0, react_1.useEffect)(function () {
        if (warning === use_user_location_1.Warnings.GPS_DISABLED) {
            errorAlert(t('SHARE_LOCATION.GPS_DISABLED_WARNING'), function () {
                Location.enableNetworkProviderAsync();
            });
        }
        if (warning === use_user_location_1.Warnings.LOCATION_REQUIRED) {
            errorAlert('SHARE_LOCATION.LOCATION_REQUIRED_WARNING', function () {
                react_native_1.Linking.openSettings();
            }, t('SHARE_LOCATION.GO_TO_SETTINGS'));
        }
    }, [warning]);
    return (<native_base_1.View flex="1" padding={8}>
      <status_bar_component_1.default />
      <safe_area_1.default>
        <native_base_1.View width={260}>
          <native_base_1.Heading fontSize={35}>
            {t('SHARE_LOCATION.GREETINGS', { name: firstName })}
            <native_base_1.Heading fontSize={35} color={theme_1.default.colors.primary[600]}>
              {' '}
              {"".concat(t('SHARE_LOCATION.LOCATION'))}
            </native_base_1.Heading>
          </native_base_1.Heading>
        </native_base_1.View>
        <native_base_1.Image source={localization_png_1.default} resizeMode="contain" flex="1" alt={t('SHARE_LOCATION.IMAGE_ALT_TEXT')}/>
        <compose_1.ActionButtonsGroup isLoading={isLoading || isRegistering} onPress={getLocation} onConfirm={onConfirmLocation} hasLocation={!!address} onSkip={onSkipLocation}>
          <native_base_1.Text color={theme_1.default.colors.gray[400]}>{t('SHARE_LOCATION.WHERE')}</native_base_1.Text>
          <native_base_1.Text my={2} fontSize={20} fontWeight="extrabold">
            {!!address && "".concat(address.city, " - ").concat(address.state)}
          </native_base_1.Text>
        </compose_1.ActionButtonsGroup>
      </safe_area_1.default>
    </native_base_1.View>);
};
exports.default = GetLocation;
