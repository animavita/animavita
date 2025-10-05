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
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var use_multi_step_navigation_hook_1 = require("./use-multi-step-navigation.hook");
var pet_form_constants_1 = require("../pet-form.constants");
var pet_form_types_1 = require("../pet-form.types");
jest.mock('native-base', function () { return (__assign(__assign({}, jest.requireActual('native-base')), { useToast: jest.fn() })); });
describe('getStepsByOrder', function () {
    it('returns step ids ordered', function () {
        expect((0, use_multi_step_navigation_hook_1.getStepsByOrder)(pet_form_constants_1.stepsLibrary)).toStrictEqual({
            0: pet_form_types_1.AdoptionSteps.PetName,
            1: pet_form_types_1.AdoptionSteps.PetBreed,
            2: pet_form_types_1.AdoptionSteps.PetType,
            3: pet_form_types_1.AdoptionSteps.PetAge,
            4: pet_form_types_1.AdoptionSteps.PetGender,
            5: pet_form_types_1.AdoptionSteps.PetSize,
            6: pet_form_types_1.AdoptionSteps.PetPhotos,
            7: pet_form_types_1.AdoptionSteps.PetObservations,
        });
    });
});
var wrapper = function (_a) {
    var children = _a.children;
    return (<native_1.NavigationContainer>{children}</native_1.NavigationContainer>);
};
var setup = function (step) {
    return (0, react_native_1.renderHook)(function () { return (0, use_multi_step_navigation_hook_1.useMultiStepNavigation)(step); }, {
        wrapper: wrapper,
    });
};
describe('useMultiStepNavigation', function () {
    describe('when the current step is PetObservations', function () {
        it('isLastStep is true', function () {
            var result = setup(pet_form_types_1.AdoptionSteps.PetObservations).result;
            expect(result.current.isLastStep).toBeTruthy();
        });
    });
    describe('when handleBack is triggered', function () {
        it('the activeStep is PetAge', function () {
            var result = setup(pet_form_types_1.AdoptionSteps.PetGender).result;
            (0, react_native_1.act)(function () {
                result.current.handleBack();
            });
            expect(result.current.isLastStep).toBeFalsy();
            expect(result.current.activeStep).toBe(pet_form_types_1.AdoptionSteps.PetAge);
        });
    });
    describe('when the current step is PetObservations', function () {
        it('isFirstStep is true', function () {
            var result = setup(pet_form_types_1.AdoptionSteps.PetName).result;
            expect(result.current.isFirstStep).toBeTruthy();
        });
        describe('when handleNext is triggered', function () {
            it('the activeStep is PetSize', function () {
                var result = setup(pet_form_types_1.AdoptionSteps.PetGender).result;
                (0, react_native_1.act)(function () {
                    result.current.handleNext();
                });
                expect(result.current.isFirstStep).toBeFalsy();
                expect(result.current.activeStep).toBe(pet_form_types_1.AdoptionSteps.PetSize);
            });
        });
    });
});
