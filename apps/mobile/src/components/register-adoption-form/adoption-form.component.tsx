import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  RadioButton,
  Subheading,
  Text,
  TextInput,
} from "react-native-paper";
import StepIcon from "../../../assets/step-background.png";
import RNSlider from "../../shared/components/Slider";
import useLocale from "../../shared/hooks/use-locale";
import theme from "../../theme";
import { stepsLibrary } from "./adoption-form.constants";
import { useMultiStepNavigation } from "./adoption-form.hooks";
import {
  AdoptionStep,
  AdoptionStepIcon,
  AdoptionSteps,
  AdoptionStepsController,
  Form,
  Types,
} from "./adoption-form.styles";
import {
  HorizontalStepperProps,
  StepperControllerProps,
  Steps,
} from "./adoption-form.types";

function HorizontalStepper({ activeStep }: HorizontalStepperProps) {
  return (
    <AdoptionSteps>
      {Object.values(stepsLibrary).map((step) =>
        stepsLibrary[activeStep].order === step.order ? (
          <AdoptionStepIcon key={step.label}>
            <img src={StepIcon} width="28" alt="step-icon" />
            <AdoptionStep>{step.order + 1}</AdoptionStep>
          </AdoptionStepIcon>
        ) : (
          <Text>{step.order + 1}</Text>
        )
      )}
    </AdoptionSteps>
  );
}

function StepperController({
  handleBack,
  handleNext,
  isLastStep,
  isFirstStep,
}: StepperControllerProps) {
  const { t } = useLocale();

  const onNextPress = () => {
    if (isLastStep) return;

    handleNext();
  };

  return (
    <AdoptionStepsController>
      <Button
        contentStyle={{ display: isFirstStep ? "none" : "flex" }}
        disabled={isFirstStep}
        onPress={handleBack}
      >
        {t("REGISTER_ADOPTION.FORM.BACK_BUTTON")}
      </Button>
      <Button
        mode="contained"
        color={theme.colors.accent}
        style={{ elevation: 0 }}
        labelStyle={{ padding: 10, color: theme.colors.onPrimary }}
        onPress={onNextPress}
      >
        {isLastStep
          ? t("REGISTER_ADOPTION.FORM.CONFIRM_BUTTON")
          : t("REGISTER_ADOPTION.FORM.NEXT_BUTTON")}
      </Button>
    </AdoptionStepsController>
  );
}

export default function RegisterAdoptionForm() {
  const { t } = useLocale();

  const [text, setText] = useState("");
  const [checked, setChecked] = useState("first");

  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } =
    useMultiStepNavigation();

  return (
    <View>
      <HorizontalStepper activeStep={activeStep} />
      <Form>
        {activeStep === Steps.PetName && (
          <TextInput
            label={t("REGISTER_ADOPTION.FORM.NAME")}
            placeholder={t("REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER")}
            mode="outlined"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}

        {activeStep === Steps.PetBreed && (
          <TextInput
            label={t("REGISTER_ADOPTION.FORM.BREED")}
            placeholder={t("REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER")}
            mode="outlined"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetObservations && (
          <TextInput
            label={t("REGISTER_ADOPTION.FORM.OBSERVATIONS")}
            placeholder={t("REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER")}
            multiline
            numberOfLines={2}
            mode="outlined"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetType && (
          <View>
            <Subheading>
              {t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL")}
            </Subheading>
            <Types>
              {["DOG", "CAT", "OTHER"].map((type) => (
                <Button
                  key={type}
                  mode="outlined"
                  onPress={() => console.log("first")}
                  style={{
                    borderRadius: 100,
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                  }}
                >
                  {t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`)}
                </Button>
              ))}
            </Types>
          </View>
        )}
        {activeStep === Steps.PetAge && (
          <View>
            <Subheading>{t("REGISTER_ADOPTION.FORM.AGE")}</Subheading>
            <RNSlider />
            <Subheading style={{ color: theme.colors.primary }}>
              1 {t("YEAR")}
            </Subheading>
          </View>
        )}
        {activeStep === Steps.PetGender && (
          <RadioButton.Group
            onValueChange={(value) => setChecked(value)}
            value={checked}
          >
            <Subheading>{t("REGISTER_ADOPTION.FORM.GENDER.LABEL")}</Subheading>
            <RadioButton.Item
              label={t("REGISTER_ADOPTION.FORM.GENDER.MALE")}
              value="first"
            />
            <RadioButton.Item
              label={t("REGISTER_ADOPTION.FORM.GENDER.FEMALE")}
              value="second"
            />
          </RadioButton.Group>
        )}
        {activeStep === Steps.PetSize && (
          <View>
            <Subheading>{t("REGISTER_ADOPTION.FORM.SIZE.LABEL")}</Subheading>
            <Types>
              {["SMALL", "MEDIUM", "BIG"].map((type) => (
                <Button
                  key={type}
                  mode="outlined"
                  onPress={() => console.log("first")}
                  style={{
                    borderRadius: 100,
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                  }}
                >
                  {t(`REGISTER_ADOPTION.FORM.SIZE.${type}`)}
                </Button>
              ))}
            </Types>
          </View>
        )}
      </Form>
      <StepperController
        handleBack={handleBack}
        handleNext={handleNext}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
      />
    </View>
  );
}
