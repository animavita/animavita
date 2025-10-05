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
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var pet_upload_photos_step_component_1 = require("./pet-upload-photos-step/pet-upload-photos-step.component");
var pet_form_constants_1 = require("@/components/pet-form/pet-form.constants");
var pet_form_types_1 = require("@/components/pet-form/pet-form.types");
var native_base_1 = require("@/components/react-hook-form/native-base");
var use_locale_1 = require("@/hooks/use-locale");
var theme_1 = require("@/theme");
var commonInputProperties = {
    size: 'xl',
    borderColor: theme_1.default.colors.primary[600],
    variant: 'outline',
    autoFocus: true,
};
var PetNameStep = function () {
    var t = (0, use_locale_1.default)().t;
    var control = (0, react_hook_form_1.useFormContext)().control;
    return (<native_base_1.RHFInput input={__assign(__assign({}, commonInputProperties), { placeholder: t('REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER'), testID: 'adoption-form-name-input', returnKeyType: 'next', isRequired: true })} control={control} name={pet_form_constants_1.stepsLibrary.PetName.fieldName}/>);
};
var PetBreedStep = function () {
    var t = (0, use_locale_1.default)().t;
    var control = (0, react_hook_form_1.useFormContext)().control;
    return (<native_base_1.RHFInput input={__assign(__assign({}, commonInputProperties), { placeholder: t('REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER'), testID: 'adoption-form-breed-input' })} control={control} name={pet_form_constants_1.stepsLibrary.PetBreed.fieldName}/>);
};
var PetObservationsStep = function () {
    var t = (0, use_locale_1.default)().t;
    var control = (0, react_hook_form_1.useFormContext)().control;
    return (<native_base_1.RHFInput input={__assign(__assign({}, commonInputProperties), { placeholder: t('REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER'), multiline: true, numberOfLines: 3 })} control={control} name={pet_form_constants_1.stepsLibrary.PetObservations.fieldName}/>);
};
var PetTypeStep = function () {
    var t = (0, use_locale_1.default)().t;
    var options = ['dog', 'cat', 'other'].map(function (type) { return ({
        label: t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.".concat(type.toUpperCase())),
        value: type,
    }); });
    return <native_base_1.RHFListSelector name={pet_form_constants_1.stepsLibrary.PetType.fieldName} options={options}/>;
};
var PetAgeStep = function () {
    var t = (0, use_locale_1.default)().t;
    var options = ['puppy', 'young', 'adult', 'senior'].map(function (age) { return ({
        label: t("REGISTER_ADOPTION.FORM.AGE_OPTIONS.".concat(age.toUpperCase())),
        value: age,
    }); });
    return <native_base_1.RHFListSelector name={pet_form_constants_1.stepsLibrary.PetAge.fieldName} options={options}/>;
};
var PetSizeStep = function () {
    var t = (0, use_locale_1.default)().t;
    var options = ['small', 'medium', 'big'].map(function (size) { return ({
        label: t("REGISTER_ADOPTION.FORM.SIZE.".concat(size.toUpperCase())),
        value: size,
    }); });
    return <native_base_1.RHFListSelector name={pet_form_constants_1.stepsLibrary.PetSize.fieldName} options={options}/>;
};
var PetGenderStep = function () {
    var t = (0, use_locale_1.default)().t;
    var options = ['male', 'female'].map(function (gender) { return ({
        label: t("REGISTER_ADOPTION.FORM.GENDER.".concat(gender.toUpperCase())),
        value: gender,
    }); });
    return <native_base_1.RHFListSelector name={pet_form_constants_1.stepsLibrary.PetGender.fieldName} options={options}/>;
};
var FormSteps = function (_a) {
    var activeStep = _a.activeStep;
    switch (activeStep) {
        case pet_form_types_1.AdoptionSteps.PetName:
            return <PetNameStep />;
        case pet_form_types_1.AdoptionSteps.PetBreed:
            return <PetBreedStep />;
        case pet_form_types_1.AdoptionSteps.PetType:
            return <PetTypeStep />;
        case pet_form_types_1.AdoptionSteps.PetAge:
            return <PetAgeStep />;
        case pet_form_types_1.AdoptionSteps.PetGender:
            return <PetGenderStep />;
        case pet_form_types_1.AdoptionSteps.PetSize:
            return <PetSizeStep />;
        case pet_form_types_1.AdoptionSteps.PetObservations:
            return <PetObservationsStep />;
        case pet_form_types_1.AdoptionSteps.PetPhotos:
            return <pet_upload_photos_step_component_1.default />;
        default:
            return null;
    }
};
exports.default = FormSteps;
