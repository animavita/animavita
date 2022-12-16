import { Box, Button, Input, Radio, Slider, Text, ZStack } from "native-base";
import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton, Subheading } from "react-native-paper";
import StepIcon from "../../../assets/step-background.png";
import RNSlider from "../../shared/components/Slider";
import useLocale from "../../shared/hooks/use-locale";
import theme from "../../theme";
import { stepsLibrary } from "./adoption-form.constants";
import { useMultiStepNavigation } from "./adoption-form.hooks";
import {
  AdoptionSteps, Form,
  Types
} from "./adoption-form.styles";
import {
  HorizontalStepperProps,
  StepperControllerProps,
  Steps
} from "./adoption-form.types";

function HorizontalStepper({ activeStep }: HorizontalStepperProps) {
  return (
    <AdoptionSteps>
      {Object.values(stepsLibrary).map((step) =>
        stepsLibrary[activeStep].order === step.order ? (
          <ZStack alignItems="center" justifyContent="center">
            <img src={StepIcon} width="28" alt="step-icon" />
            <Text fontWeight="bold" color="white">
              {step.order + 1}
            </Text>
          </ZStack>
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
    <Box width="full" display="flex" flexDirection="row" justifyContent="space-between">
      <Button
        display={isFirstStep ? "none" : "flex"}
        disabled={isFirstStep}
        color={theme.colors.primary[600]}
        variant="outline"
        onPress={handleBack}
      >
        {t("REGISTER_ADOPTION.FORM.BACK_BUTTON")}
      </Button>
      <Button color={theme.colors.primary[600]} onPress={onNextPress}>
        {isLastStep
          ? t("REGISTER_ADOPTION.FORM.CONFIRM_BUTTON")
          : t("REGISTER_ADOPTION.FORM.NEXT_BUTTON")}
      </Button>
    </Box>
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
          <Input
            // label={t("REGISTER_ADOPTION.FORM.NAME")}
            size="xl"
            placeholder={t("REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER")}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}

        {activeStep === Steps.PetBreed && (
          <Input
            // label={t("REGISTER_ADOPTION.FORM.BREED")}
            size="xl"
            placeholder={t("REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER")}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetObservations && (
          <Input
            // label={t("REGISTER_ADOPTION.FORM.OBSERVATIONS")}
            size="xl"
            placeholder={t("REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER")}
            multiline
            numberOfLines={2}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetType && (
          <View>
            <Subheading>
              {t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL")}
            </Subheading>
            <Button.Group display='flex' alignContent="center" isAttached>
              {["DOG", "CAT", "OTHER"].map((type) => (
                <Button key={type} variant="outline" onPress={() => console.log("first")}>
                  {t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`)}
                </Button>
              ))}
            </Button.Group>
          </View>
        )}
        {activeStep === Steps.PetAge && (
          <View>
            <Subheading>{t("REGISTER_ADOPTION.FORM.AGE")}</Subheading>
            <Slider
              w="full"
              defaultValue={70}
              minValue={0}
              maxValue={100}
              accessibilityLabel={t("REGISTER_ADOPTION.FORM.AGE")} step={10}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Subheading>1 {t("YEAR")}</Subheading>
          </View>
        )}
        {activeStep === Steps.PetGender && (
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={checked}
            onChange={nextValue => setChecked(nextValue)}
          >
            <Subheading>{t("REGISTER_ADOPTION.FORM.GENDER.LABEL")}</Subheading>
            <Radio value="first" my={1}>
              {t("REGISTER_ADOPTION.FORM.GENDER.MALE")}
            </Radio>
            <Radio value="second" my={1}>
              {t("REGISTER_ADOPTION.FORM.GENDER.FEMALE")}
            </Radio>
          </Radio.Group>
        )}
        {activeStep === Steps.PetSize && (
          <View>
            <Subheading>{t("REGISTER_ADOPTION.FORM.SIZE.LABEL")}</Subheading>
            <Types>
              {["SMALL", "MEDIUM", "BIG"].map((type) => (
                <Button variant="outline" key={type} onPress={() => console.log("first")}>
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
