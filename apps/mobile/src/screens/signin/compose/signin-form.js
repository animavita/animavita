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
exports.SignInForm = exports.Form = void 0;
var validation_schemas_1 = require("@animavita/validation-schemas");
var joi_1 = require("@hookform/resolvers/joi");
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var auth_header_1 = require("@/components/auth-header");
var native_base_2 = require("@/components/react-hook-form/native-base");
var use_locale_1 = require("@/hooks/use-locale");
var use_user_signin_1 = require("@/hooks/use-user-signin");
var use_navigation_1 = require("@/navigation/use-navigation");
var Form = function () {
    var t = (0, use_locale_1.default)().t;
    var _a = (0, use_user_signin_1.default)(), signIn = _a.signIn, isSigningIn = _a.isSigningIn, error = _a.error;
    var toast = (0, native_base_1.useToast)();
    var signinForm = (0, react_hook_form_1.useFormContext)();
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    (0, react_1.useEffect)(function () {
        if (error)
            toast.show({ title: error, variant: 'solid' });
    }, [error]);
    var onSignIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isValid, values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, signinForm.trigger()];
                case 1:
                    isValid = _a.sent();
                    if (!isValid) {
                        toast.show({
                            description: 'Invalid data!',
                        });
                        return [2 /*return*/];
                    }
                    values = signinForm.getValues();
                    return [4 /*yield*/, signIn(values.email, values.password)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <native_base_1.Stack space={2.5}>
        <native_base_2.RHFInput input={{
            placeholder: t('SIGN_IN.FORM.EMAIL_INPUT'),
            returnKeyType: 'next',
            isRequired: true,
            keyboardType: 'email-address',
            inputMode: 'email',
            autoCapitalize: 'none',
            autoFocus: true,
        }} control={signinForm.control} name="email" label={t('SIGN_IN.FORM.EMAIL_INPUT')}/>

        <native_base_2.RHFInput input={{
            placeholder: t('SIGN_IN.FORM.PASSWORD_INPUT'),
            returnKeyType: 'go',
            isRequired: true,
            type: 'password',
        }} control={signinForm.control} name="password" label={t('SIGN_IN.FORM.PASSWORD_INPUT')}/>

        <native_base_1.FormControl>
          <native_base_1.Button marginTop={5} width="full" onPress={function () { return onSignIn(); }} disabled={isSigningIn}>
            {t('SIGN_IN.FORM.LOGIN_BUTTON')}
          </native_base_1.Button>
        </native_base_1.FormControl>
      </native_base_1.Stack>

      <native_base_1.Button variant="link" onPress={function () {
            navigate('SignUp');
        }} alignSelf="center">
        {t('SIGN_IN.FORM.SIGN_UP_LINK')}
      </native_base_1.Button>

      {isSigningIn && <native_base_1.Spinner testID="sign-spinner"/>}
    </>);
};
exports.Form = Form;
var SignInForm = function (_a) {
    var defaultValues = _a.defaultValues;
    var t = (0, use_locale_1.default)().t;
    var signupForm = (0, react_hook_form_1.useForm)({
        resolver: (0, joi_1.joiResolver)(validation_schemas_1.signInValidationSchema),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    return (<native_base_1.KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
      <react_hook_form_1.FormProvider {...signupForm}>
        <auth_header_1.default action={t('SIGN_IN.FORM.LOGIN_BUTTON')} _android={{ marginY: 10 }}/>

        <exports.Form />
      </react_hook_form_1.FormProvider>
    </native_base_1.KeyboardAvoidingView>);
};
exports.SignInForm = SignInForm;
