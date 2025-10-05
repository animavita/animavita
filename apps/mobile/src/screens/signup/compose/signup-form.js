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
exports.SignUpForm = void 0;
var validation_schemas_1 = require("@animavita/validation-schemas");
var joi_1 = require("@hookform/resolvers/joi");
var native_base_1 = require("native-base");
var react_hook_form_1 = require("react-hook-form");
var react_native_1 = require("react-native");
var auth_header_1 = require("@/components/auth-header");
var native_base_2 = require("@/components/react-hook-form/native-base");
var use_locale_1 = require("@/hooks/use-locale");
var use_user_register_1 = require("@/hooks/use-user-register");
var use_navigation_1 = require("@/navigation/use-navigation");
// making location optional since it's gonna be provided in another screen
var signupSchema = validation_schemas_1.signUpValidationSchema.fork(['location'], function (schema) { return schema.optional(); });
var Form = function () {
    var t = (0, use_locale_1.default)().t;
    var _a = (0, use_user_register_1.default)(), registerUser = _a.registerUser, isRegistering = _a.isRegistering;
    var signupForm = (0, react_hook_form_1.useFormContext)();
    var toast = (0, native_base_1.useToast)();
    var onConfirm = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, signupForm.trigger()];
                case 1:
                    isValid = _a.sent();
                    if (!isValid) {
                        toast.show({
                            description: 'Invalid data!',
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, registerUser(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<native_base_1.Stack space={2.5}>
      <native_base_2.RHFInput input={{
            placeholder: t('SIGN_UP.FORM.NAME_INPUT'),
            testID: 'signup-form-name-input',
            returnKeyType: 'next',
            isRequired: true,
            autoFocus: true,
        }} control={signupForm.control} name="name" label={t('SIGN_UP.FORM.NAME_INPUT')}/>

      <native_base_2.RHFInput input={{
            placeholder: t('SIGN_UP.FORM.EMAIL_INPUT'),
            testID: 'signup-form-email-input',
            returnKeyType: 'next',
            isRequired: true,
            keyboardType: 'email-address',
            inputMode: 'email',
            autoCapitalize: 'none',
        }} control={signupForm.control} name="email" label={t('SIGN_UP.FORM.EMAIL_INPUT')}/>

      <native_base_2.RHFInput input={{
            placeholder: t('SIGN_UP.FORM.PHONE_INPUT'),
            testID: 'signup-form-phone-input',
            returnKeyType: 'next',
            isRequired: true,
            keyboardType: 'phone-pad',
            inputMode: 'tel',
        }} control={signupForm.control} name="phoneNumber" label={t('SIGN_UP.FORM.PHONE_INPUT')}/>

      <native_base_2.RHFInput input={{
            placeholder: t('SIGN_UP.FORM.PASSWORD_INPUT'),
            testID: 'signup-form-password-input',
            returnKeyType: 'go',
            isRequired: true,
            type: 'password',
        }} control={signupForm.control} name="password" label={t('SIGN_UP.FORM.PASSWORD_INPUT')}/>

      <native_base_1.FormControl>
        <native_base_1.Button marginTop={6} width="full" onPress={function () {
            onConfirm(signupForm.getValues());
        }} isLoading={isRegistering}>
          {t('SIGN_UP.FORM.SIGN_UP_BUTTON')}
        </native_base_1.Button>
      </native_base_1.FormControl>
    </native_base_1.Stack>);
};
var SignUpForm = function (_a) {
    var defaultValues = _a.defaultValues;
    var t = (0, use_locale_1.default)().t;
    var signupForm = (0, react_hook_form_1.useForm)({
        resolver: (0, joi_1.joiResolver)(signupSchema),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    return (<react_native_1.KeyboardAvoidingView behavior="position">
      <react_hook_form_1.FormProvider {...signupForm}>
        <auth_header_1.default action={t('SIGN_UP.FORM.SIGN_UP_BUTTON')} _android={{ marginY: 10 }}/>

        <Form />
      </react_hook_form_1.FormProvider>
      <native_base_1.Button variant="link" onPress={function () { return navigate('SignIn'); }} alignSelf="center">
        {t('SIGN_UP.FORM.SIGN_IN_LINK_BUTTON')}
      </native_base_1.Button>
    </react_native_1.KeyboardAvoidingView>);
};
exports.SignUpForm = SignUpForm;
