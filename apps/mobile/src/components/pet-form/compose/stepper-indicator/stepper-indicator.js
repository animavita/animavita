"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var step_background_png_1 = require("@assets/step-background.png");
var native_base_1 = require("native-base");
var react_1 = require("react");
var delimiter_1 = require("@/components/delimiter/delimiter");
var pet_form_constants_1 = require("@/components/pet-form/pet-form.constants");
var use_locale_1 = require("@/hooks/use-locale");
var theme_1 = require("@/theme");
var StepperIndicator = function (_a) {
    var activeStep = _a.activeStep, title = _a.title;
    var t = (0, use_locale_1.default)().t;
    var totalSteps = Object.keys(pet_form_constants_1.stepsLibrary).length;
    var stepNumber = pet_form_constants_1.stepsLibrary[activeStep].order + 1;
    var processValue = (stepNumber * 100) / totalSteps;
    var label = pet_form_constants_1.stepsLibrary[activeStep].label;
    return (<native_base_1.Box>
      <native_base_1.Progress w="full" value={processValue} _filledTrack={{ rounded: 'none', borderBottomRightRadius: 'md' }} rounded="none" _ios={{
            display: 'none',
        }}/>
      <delimiter_1.default marginY={0}>
        <native_base_1.Box position="relative" display="flex" flexDirection="row" justifyContent="space-between" alignContent="center" _android={{ marginTop: 5 }} _web={{ marginTop: 7 }}>
          <native_base_1.Box>
            <native_base_1.Text color={theme_1.default.colors.gray[600]}>{title}</native_base_1.Text>
            <native_base_1.Heading fontWeight="medium" color={theme_1.default.colors.primary[600]}>
              {t(label)}
            </native_base_1.Heading>
          </native_base_1.Box>
          <native_base_1.Image position="absolute" right={-18} bottom={-14} source={step_background_png_1.default} alt="stepper icon" size="md"/>
          <native_base_1.Box alignItems="center" justifyContent="center">
            <native_base_1.Text fontWeight="medium" color="white" fontSize="sm">
              {t('REGISTER_ADOPTION.STEP')}
            </native_base_1.Text>
            <native_base_1.Text lineHeight="sm" fontWeight="medium" color="white" fontSize="2xl">
              {stepNumber}/{totalSteps}
            </native_base_1.Text>
          </native_base_1.Box>
        </native_base_1.Box>
      </delimiter_1.default>
    </native_base_1.Box>);
};
exports.default = StepperIndicator;
