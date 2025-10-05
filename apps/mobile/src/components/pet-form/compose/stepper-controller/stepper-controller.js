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
var pet_form_constants_1 = require("@/components/pet-form/pet-form.constants");
var use_form_validation_1 = require("@/hooks/react-hook-form/use-form-validation");
var use_locale_1 = require("@/hooks/use-locale");
var theme_1 = require("@/theme");
var StepperController = function (_a) {
    var handleBack = _a.handleBack, handleNext = _a.handleNext, onConfirm = _a.onConfirm, isLastStep = _a.isLastStep, activeStep = _a.activeStep, saving = _a.saving;
    var t = (0, use_locale_1.default)().t;
    var validateField = (0, use_form_validation_1.default)('adoption', 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES').validateField;
    var onBackPress = function () {
        handleBack();
    };
    var onNextPress = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fieldName, isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLastStep) {
                        onConfirm();
                        return [2 /*return*/];
                    }
                    fieldName = pet_form_constants_1.stepsLibrary[activeStep].fieldName;
                    return [4 /*yield*/, validateField(fieldName)];
                case 1:
                    isValid = _a.sent();
                    if (isValid)
                        handleNext();
                    return [2 /*return*/];
            }
        });
    }); };
    var label = isLastStep
        ? t('REGISTER_ADOPTION.FORM.CONFIRM_BUTTON')
        : t('REGISTER_ADOPTION.FORM.NEXT_BUTTON');
    return (<native_base_1.Box marginTop="auto" display="flex" flexDirection="row" justifyContent="space-between">
      <native_base_1.Button color={theme_1.default.colors.primary[600]} variant="outline" onPress={onBackPress} disabled={saving}>
        {t('REGISTER_ADOPTION.FORM.BACK_BUTTON')}
      </native_base_1.Button>
      <native_base_1.Button color={theme_1.default.colors.primary[600]} onPress={onNextPress} marginLeft="auto" disabled={saving} isLoading={saving} isLoadingText={label}>
        {label}
      </native_base_1.Button>
    </native_base_1.Box>);
};
exports.default = StepperController;
