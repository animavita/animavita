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
exports.useMultiStepNavigation = exports.getStepsByOrder = void 0;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var pet_form_constants_1 = require("../pet-form.constants");
var pet_form_types_1 = require("../pet-form.types");
var getStepsByOrder = function (stepsLibrary) {
    return Object.keys(pet_form_types_1.AdoptionSteps).reduce(function (prev, stepId) {
        var _a;
        var step = stepId;
        return __assign(__assign({}, prev), (_a = {}, _a[stepsLibrary[step].order] = step, _a));
    }, {});
};
exports.getStepsByOrder = getStepsByOrder;
var useMultiStepNavigation = function (initialStep) {
    if (initialStep === void 0) { initialStep = pet_form_types_1.AdoptionSteps.PetName; }
    var _a = (0, react_1.useState)(initialStep), activeStep = _a[0], setActiveStep = _a[1];
    var goBack = (0, native_1.useNavigation)().goBack;
    var stepsByOrder = (0, exports.getStepsByOrder)(pet_form_constants_1.stepsLibrary);
    var currentStepNumber = pet_form_constants_1.stepsLibrary[activeStep].order;
    var isFirstStep = currentStepNumber === 0;
    var isLastStep = function () {
        var totalSteps = Object.keys(pet_form_types_1.AdoptionSteps).length - 1;
        return currentStepNumber >= totalSteps;
    };
    var handleBack = function () {
        if (isFirstStep) {
            goBack();
            return;
        }
        var step = stepsByOrder[currentStepNumber - 1];
        setActiveStep(step);
    };
    var handleNext = function () {
        var step = stepsByOrder[currentStepNumber + 1];
        setActiveStep(step);
    };
    return {
        isFirstStep: isFirstStep,
        isLastStep: isLastStep(),
        handleBack: handleBack,
        handleNext: handleNext,
        activeStep: activeStep,
    };
};
exports.useMultiStepNavigation = useMultiStepNavigation;
