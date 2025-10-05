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
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("@testing-library/react-native");
var react_native_2 = require("react-native");
var pet_form_component_1 = require("./pet-form.component");
var pet_form_types_1 = require("./pet-form.types");
var test_utils_1 = require("@/test/test-utils");
var mockShow = jest.fn();
jest.mock('native-base', function () { return (__assign(__assign({}, jest.requireActual('native-base')), { useToast: function () { return ({
        show: mockShow,
        isActive: function () { return false; },
    }); } })); });
var forwardStep = function () {
    test_utils_1.fireEvent.press(test_utils_1.screen.getByText(/pr[oó]xima etapa/gi));
};
var fillOutTextInput = function (testId, value) { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.screen.findByTestId("adoption-form-".concat(testId, "-input"))];
            case 1:
                input = _a.sent();
                test_utils_1.fireEvent.changeText(input, value);
                return [2 /*return*/];
        }
    });
}); };
var pickOptionFromList = function (optionText) { return __awaiter(void 0, void 0, void 0, function () {
    var option;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.screen.findByText(optionText)];
            case 1:
                option = _a.sent();
                test_utils_1.fireEvent.press(option);
                return [2 /*return*/];
        }
    });
}); };
var goToLastStep = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fillOutTextInput('name', 'Bob')];
            case 1:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, fillOutTextInput('breed', 'pitbull')];
            case 2:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, pickOptionFromList(/c[aã]o/gi)];
            case 3:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, pickOptionFromList(/filhote \(menos de 1 ano\)/i)];
            case 4:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, pickOptionFromList(/macho/i)];
            case 5:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, pickOptionFromList(/grande/i)];
            case 6:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, test_utils_1.screen.findByText(/fotos/i)];
            case 7:
                _a.sent();
                forwardStep();
                return [4 /*yield*/, test_utils_1.screen.findByText(/confirmar/i)];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var Stack = (0, native_stack_1.createNativeStackNavigator)();
var MainNavigator = function (_a) {
    var petForm = _a.petForm;
    var defaultForm = function () { return <pet_form_component_1.default defaultValues={{ age: 'adult' }} title="Register Pet"/>; };
    return (<Stack.Navigator initialRouteName="RegisterPet">
      <Stack.Screen name="Home">
        {function () {
            return <react_native_2.Text>Welcome to Animavita!</react_native_2.Text>;
        }}
      </Stack.Screen>
      <Stack.Screen name="RegisterPet">{petForm || defaultForm}</Stack.Screen>
    </Stack.Navigator>);
};
var stepErrors = [
    {
        step: pet_form_types_1.AdoptionSteps.PetName,
        errorMessage: 'Nome do Pet não pode ser vazio',
    },
    {
        step: pet_form_types_1.AdoptionSteps.PetBreed,
        errorMessage: 'Raça do Pet não pode ser vazia',
    },
    {
        step: pet_form_types_1.AdoptionSteps.PetType,
        errorMessage: 'Informe o tipo do seu Pet',
    },
    {
        step: pet_form_types_1.AdoptionSteps.PetAge,
        errorMessage: 'Informe a idade do seu Pet',
    },
    {
        step: pet_form_types_1.AdoptionSteps.PetGender,
        errorMessage: 'Informe o sexo do seu Pet',
    },
    {
        step: pet_form_types_1.AdoptionSteps.PetSize,
        errorMessage: 'Informe o porte do seu Pet',
    },
];
describe('PetForm', function () {
    describe('when the user presses the confirm button', function () {
        describe('and the form state is valid', function () {
            it('takes the user to the home screen', function () { return __awaiter(void 0, void 0, void 0, function () {
                var confirmButton, home;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, test_utils_1.renderWithProviders)(<MainNavigator />);
                            return [4 /*yield*/, goToLastStep()];
                        case 1:
                            _a.sent();
                            confirmButton = test_utils_1.screen.getByText(/confirmar/i);
                            (0, react_native_1.act)(function () {
                                test_utils_1.fireEvent.press(confirmButton);
                            });
                            return [4 /*yield*/, test_utils_1.screen.findByText(/welcome to animavita/i)];
                        case 2:
                            home = _a.sent();
                            expect(home).toBeOnTheScreen();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('and the form state is not valid', function () {
            it('shows the error message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var confirmButton;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, test_utils_1.renderWithProviders)(<MainNavigator petForm={function () { return (<pet_form_component_1.default initialStep={pet_form_types_1.AdoptionSteps.PetObservations} title="Register Pet"/>); }}/>);
                            confirmButton = test_utils_1.screen.getByText(/confirmar/i);
                            test_utils_1.fireEvent.press(confirmButton);
                            return [4 /*yield*/, (0, test_utils_1.waitFor)(function () {
                                    return expect(mockShow).toHaveBeenNthCalledWith(1, {
                                        description: "Dados inv\u00E1lidos!",
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe.each(stepErrors)('when the $step step is invalid', function (_a) {
        var step = _a.step, errorMessage = _a.errorMessage;
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it('shows the error message', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, test_utils_1.renderWithProviders)(<MainNavigator petForm={function () { return <pet_form_component_1.default initialStep={step} title="Register Pet"/>; }}/>);
                        forwardStep();
                        return [4 /*yield*/, (0, test_utils_1.waitFor)(function () {
                                return expect(mockShow).toHaveBeenNthCalledWith(1, {
                                    description: errorMessage,
                                    id: 'adoption-form-toast',
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
