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
exports.validationSchema = void 0;
var validation_schemas_1 = require("@animavita/validation-schemas");
var joi_1 = require("@hookform/resolvers/joi");
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var react_native_1 = require("react-native");
var form_steps_1 = require("./compose/form-steps");
var stepper_controller_1 = require("./compose/stepper-controller");
var stepper_indicator_1 = require("./compose/stepper-indicator");
var use_multi_step_navigation_hook_1 = require("./hooks/use-multi-step-navigation.hook");
var delimiter_1 = require("@/components/delimiter");
var use_locale_1 = require("@/hooks/use-locale");
var use_pets_1 = require("@/hooks/use-pets/use-pets");
exports.validationSchema = validation_schemas_1.adoptionValidationSchema.fork(['name', 'gender', 'breed', 'type', 'age', 'size'], function (schema) { return schema.required(); });
var PetForm = function (_a) {
    var defaultValues = _a.defaultValues, initialStep = _a.initialStep, title = _a.title;
    var t = (0, use_locale_1.default)().t;
    var _b = (0, use_multi_step_navigation_hook_1.useMultiStepNavigation)(initialStep), activeStep = _b.activeStep, isLastStep = _b.isLastStep, isFirstStep = _b.isFirstStep, handleBack = _b.handleBack, handleNext = _b.handleNext;
    var petForm = (0, react_hook_form_1.useForm)({
        resolver: (0, joi_1.joiResolver)(exports.validationSchema),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    var _c = (0, use_pets_1.default)(), saveOrCreatePet = _c.saveOrCreatePet, saving = _c.saving;
    var toast = (0, native_base_1.useToast)();
    var onConfirm = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isValid, pet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, petForm.trigger()];
                case 1:
                    isValid = _a.sent();
                    if (!isValid) {
                        toast.show({
                            description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.INVALID_DATA'),
                        });
                        return [2 /*return*/];
                    }
                    pet = petForm.getValues();
                    return [4 /*yield*/, saveOrCreatePet(pet)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<native_base_1.KeyboardAvoidingView flex="1" behavior="padding" enabled={react_native_1.Platform.OS === 'ios'}>
      <react_hook_form_1.FormProvider {...petForm}>
        <stepper_indicator_1.default activeStep={activeStep} title={title}/>
        <delimiter_1.default marginTop={0} flex="1">
          <native_base_1.Box position="relative" marginTop="8" display="flex" flex-direction="column" justify-content="center">
            <form_steps_1.default activeStep={activeStep}/>
          </native_base_1.Box>

          <stepper_controller_1.default isLastStep={isLastStep} isFirstStep={isFirstStep} activeStep={activeStep} saving={saving} handleBack={handleBack} handleNext={handleNext} onConfirm={onConfirm}/>
        </delimiter_1.default>
      </react_hook_form_1.FormProvider>
    </native_base_1.KeyboardAvoidingView>);
};
exports.default = PetForm;
