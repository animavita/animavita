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
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var stepper_controller_1 = require("./stepper-controller");
var pet_form_types_1 = require("@/components/pet-form/pet-form.types");
var useFormValidationModule = require("@/hooks/react-hook-form/use-form-validation/use-form-validation.hook");
var test_utils_1 = require("@/test/test-utils");
var handleBack = jest.fn();
var handleNext = jest.fn();
var onConfirm = jest.fn();
var Providers = function (_a) {
    var children = _a.children;
    var form = (0, react_hook_form_1.useForm)();
    return <react_hook_form_1.FormProvider {...form}>{children}</react_hook_form_1.FormProvider>;
};
var setup = function (propsOverride) {
    if (propsOverride === void 0) { propsOverride = {}; }
    return (0, test_utils_1.renderWithProviders)(<Providers>
      <stepper_controller_1.default handleBack={handleBack} handleNext={handleNext} onConfirm={onConfirm} isLastStep={false} isFirstStep={false} activeStep={pet_form_types_1.AdoptionSteps.PetName} saving={false} {...propsOverride}/>
    </Providers>);
};
describe('StepperController', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('when the back button is pressed', function () {
        it('calls `handleBack`', function () {
            var getByText = setup().getByText;
            test_utils_1.fireEvent.press(getByText(/voltar/i));
            expect(handleBack).toHaveBeenCalledTimes(1);
        });
    });
    describe('when the next button is pressed', function () {
        it('calls `onNextPress`', function () { return __awaiter(void 0, void 0, void 0, function () {
            var getByText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(useFormValidationModule, 'default').mockReturnValueOnce({
                            validateField: function () { return Promise.resolve(true); },
                        });
                        getByText = setup().getByText;
                        test_utils_1.fireEvent.press(getByText(/pr[oó]xima etapa/gi));
                        return [4 /*yield*/, (0, test_utils_1.waitFor)(function () { return expect(handleNext).toHaveBeenCalledTimes(1); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when the next button is pressed and it is the last step', function () {
        it('calls `onConfirm`', function () {
            var getByText = setup({ isLastStep: true }).getByText;
            test_utils_1.fireEvent.press(getByText(/confirmar/gi));
            expect(onConfirm).toHaveBeenCalledTimes(1);
        });
    });
    describe('when `saving` is true', function () {
        it('disables next button', function () {
            var getByText = setup({ saving: true, isLastStep: true }).getByText;
            expect(getByText(/confirmar/i)).toBeDisabled();
        });
    });
});
