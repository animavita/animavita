import { useNavigation } from "@react-navigation/native";
import { Box, Button, Heading, Image, Input, Progress, Slider, Text } from "native-base";
import React, { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import StepIcon from '../../../assets/step-background.png';
import useDeviceDimensions from "../../shared/hooks/use-device-dimensions";
import useLocale from "../../shared/hooks/use-locale";
import theme from "../../theme";
import { useMultiStepNavigation } from "./adoption-form.hooks";
import { StepperControllerProps, StepperIndicatorProps, Steps } from "./adoption-form.types";

function StepperIndicator({ activeStep }: StepperIndicatorProps) {
  const { t } = useLocale();

  const steps = {
    [Steps.PetName.toString()]: {
      step: 1, label: t("REGISTER_ADOPTION.FORM.NAME")
    },
    [Steps.PetBreed.toString()]: {
      step: 2, label: t("REGISTER_ADOPTION.FORM.BREED")
    },
    [Steps.PetObservations.toString()]: {
      step: 3, label: t("REGISTER_ADOPTION.FORM.OBSERVATIONS")
    },
    [Steps.PetType.toString()]: {
      step: 4, label: t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL")
    },
    [Steps.PetAge.toString()]: {
      step: 5, label: t("REGISTER_ADOPTION.FORM.AGE")
    },
    [Steps.PetGender.toString()]: {
      step: 6, label: t("REGISTER_ADOPTION.FORM.GENDER.LABEL")
    },
    [Steps.PetSize.toString()]: {
      step: 7, label: t("REGISTER_ADOPTION.FORM.SIZE.LABEL")
    }
  }
  const totalSteps = Object.keys(steps).length
  const currentStep = steps[activeStep].step

  const processValue = (currentStep * 100) / totalSteps

  return (
    <Box>
      <Progress
        position='absolute'
        w='full'
        value={processValue}
        _filledTrack={{ rounded: 'none', borderBottomRightRadius: 'md' }}
        rounded='none'
      />
      <Box
        position='relative'
        margin={8}
        display='flex'
        flexDirection='row'
        justifyContent="space-between"
        alignContent='center'
      >
        <Box>
          <Text color={theme.colors.gray[600]}>{t("REGISTER_ADOPTION.TITLE")}</Text>
          <Heading fontWeight='medium' color={theme.colors.primary[600]}>
            {steps[activeStep].label}
          </Heading>
        </Box>
        <Image
          position='absolute'
          right={-14}
          bottom={-12}
          source={StepIcon}
          alt="Alternate Text"
          size="md"
        />
        <Box alignItems="center" justifyContent="center">
          <Text fontWeight="medium" color="white" fontSize='sm'>
            {t('REGISTER_ADOPTION.STEP')}
          </Text>
          <Text lineHeight='sm' fontWeight="medium" color="white" fontSize='3xl'>
            {steps[activeStep].step}/{totalSteps}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function StepperController({
  handleBack,
  handleNext,
  isLastStep,
  isFirstStep,
}: StepperControllerProps) {
  const { t } = useLocale();
  const navigation = useNavigation();

  const onBackPress = () => {
    if (isFirstStep) {
      navigation.goBack()
      return;
    }

    handleBack();
  };

  const onNextPress = () => {
    if (isLastStep) return;

    handleNext();
  };

  return (
    <Box marginX="8" marginBottom="8" display="flex" flexDirection="row" justifyContent="space-between">
      <Button
        color={theme.colors.primary[600]}
        variant="outline"
        onPress={onBackPress}
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
  const { deviceHeight } = useDeviceDimensions()
  const [text, setText] = useState("");

  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } =
    useMultiStepNavigation();

  return (
    <Box height='full'>
      <StepperIndicator activeStep={activeStep} />
      <Box
        position="relative"
        margin="8"
        display="flex"
        flex-direction="column"
        height={deviceHeight / 1.5}
        justify-content="center"
      >
        {activeStep === Steps.PetName && (
          <Input
            size="xl"
            borderColor={theme.colors.primary[600]}
            placeholder={t("REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER")}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetBreed && (
          <Input
            size="xl"
            borderColor={theme.colors.primary[600]}
            placeholder={t("REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER")}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetObservations && (
          <Input
            size="xl"
            borderColor={theme.colors.primary[600]}
            placeholder={t("REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER")}
            multiline
            numberOfLines={2}
            variant="outline"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        )}
        {activeStep === Steps.PetType && (
          <Box
            display="flex"
            flex-direction="row"
            justify-content="space-around"
            marginY={moderateScale(8)}
          >
            {["DOG", "CAT", "OTHER"].map((type) => (
              <Button key={type} variant="outline" marginY="2" onPress={() => console.log("first")}>
                {t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`)}
              </Button>
            ))}
          </Box>
        )}
        {activeStep === Steps.PetAge && (
          <Box>
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
            <Text textAlign='right'>1 {t("YEAR")}</Text>
          </Box>
        )}
        {activeStep === Steps.PetGender && (
          <Box
            display="flex"
            flex-direction="row"
            justify-content="space-around"
            marginY={moderateScale(8)}
          >
            <Button variant="outline" marginY="2" onPress={() => console.log("first")}>
              {t("REGISTER_ADOPTION.FORM.GENDER.MALE")}
            </Button>
            <Button variant="outline" marginY="2" onPress={() => console.log("first")}>
              {t("REGISTER_ADOPTION.FORM.GENDER.FEMALE")}
            </Button>
          </Box>
        )}
        {activeStep === Steps.PetSize && (
          <Box
            display="flex"
            flex-direction="row"
            justify-content="space-around"
            marginY={moderateScale(8)}
          >
            {["SMALL", "MEDIUM", "BIG"].map((type) => (
              <Button variant="outline" marginY="2" key={type} onPress={() => console.log("first")}>
                {t(`REGISTER_ADOPTION.FORM.SIZE.${type}`)}
              </Button>
            ))}
          </Box>
        )}
      </Box>
      <StepperController
        handleBack={handleBack}
        handleNext={handleNext}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
      />
    </Box>
  );
}
