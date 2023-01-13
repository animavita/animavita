import React, { useState } from "react";
import { Box, Button, Input, Slider, Text } from "native-base";
import theme from "../../../../theme";
import { moderateScale } from "react-native-size-matters";
import useLocale from "../../../../shared/hooks/use-locale";
import { AdoptionSteps } from "../../adoption-form.types";

function PetNameStep() {
  const [text, setText] = useState("");
  const { t } = useLocale();

  return (
    <Input
      size="xl"
      borderColor={theme.colors.primary[600]}
      placeholder={t("REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER")}
      variant="outline"
      value={text}
      onChangeText={(text) => setText(text)}
    />
  );
};

function PetBreedStep() {
  const [text, setText] = useState("");
  const { t } = useLocale();

  return (
    <Input
      size="xl"
      borderColor={theme.colors.primary[600]}
      placeholder={t("REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER")}
      variant="outline"
      value={text}
      onChangeText={(text) => setText(text)}
    />
  );
};

function PetObservationsStep() {
  const [text, setText] = useState("");
  const { t } = useLocale();

  return (
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
  );
};

function PetTypeStep() {
  const { t } = useLocale();

  return (
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
  );
};

function PetAgeStep() {
  const { t } = useLocale();

  return (
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
  );
};

function PetSizeStep() {
  const { t } = useLocale();

  return (
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
  );
};

function PetGenderStep() {
  const { t } = useLocale();

  return (
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
  )
}

function FormSteps({ activeStep }: { activeStep: AdoptionSteps }) {
  switch(activeStep) {
    case AdoptionSteps.PetName:
      return <PetNameStep />;
    case AdoptionSteps.PetBreed:
      return <PetBreedStep />;
    case AdoptionSteps.PetType:
      return <PetTypeStep />;
    case AdoptionSteps.PetAge:
      return <PetAgeStep />;
    case AdoptionSteps.PetGender:
      return <PetGenderStep />;
    case AdoptionSteps.PetSize:
      return <PetSizeStep />;
    case AdoptionSteps.PetObservations:
      return <PetObservationsStep />;
    default:
      return null;
  }
}

export default FormSteps;