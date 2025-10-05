"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stepper_indicator_1 = require("./stepper-indicator");
var pet_form_constants_1 = require("@/components/pet-form/pet-form.constants");
var pet_form_types_1 = require("@/components/pet-form/pet-form.types");
var test_utils_1 = require("@/test/test-utils");
var stepKeys = Object.keys(pet_form_constants_1.stepsLibrary);
describe('StepperIndicator', function () {
    it('renders the correct label', function () {
        var getByText = (0, test_utils_1.renderWithProviders)(<stepper_indicator_1.default activeStep={pet_form_types_1.AdoptionSteps.PetGender}/>).getByText;
        expect(getByText(/sexo do pet/i)).toBeOnTheScreen();
    });
    describe.each(stepKeys)('when the current step is %s', function (step) {
        var currentStepNumber = stepKeys.findIndex(function (s) { return s === step; }) + 1;
        it("renders ".concat(currentStepNumber, "/8"), function () {
            var getByText = (0, test_utils_1.renderWithProviders)(<stepper_indicator_1.default activeStep={step}/>).getByText;
            expect(getByText("".concat(currentStepNumber, "/8"))).toBeOnTheScreen();
        });
    });
});
