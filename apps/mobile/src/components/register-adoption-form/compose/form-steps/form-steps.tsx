import { Box, Slider, Text } from 'native-base';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useLocale from '../../../../shared/hooks/use-locale';
import theme from '../../../../theme';
import { RHFInput, RHFListSelector } from '../../../react-hook-form/native-base';
import { stepsLibrary } from '../../adoption-form.constants';
import { AdoptionSteps } from '../../adoption-form.types';

const commonInputProperties = {
  size: 'xl',
  borderColor: theme.colors.primary[600],
  variant: 'outline',
  autoFocus: true,
};

function PetNameStep() {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER'),
      }}
      control={control}
      name={stepsLibrary.PetName.fieldName}
    />
  );
}

function PetBreedStep() {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER'),
      }}
      control={control}
      name={stepsLibrary.PetBreed.fieldName}
    />
  );
}

function PetObservationsStep() {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER'),
        multiline: true,
        numberOfLines: 3,
      }}
      control={control}
      name={stepsLibrary.PetObservations.fieldName}
    />
  );
}

function PetTypeStep() {
  const { t } = useLocale();

  const options = ['DOG', 'CAT', 'OTHER'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetType.fieldName} options={options} />;
}

function PetAgeStep() {
  const { t } = useLocale();
  const { setValue } = useFormContext();
  const fieldName = stepsLibrary.PetAge.fieldName;
  const petAgeValue = useWatch({ name: fieldName });

  return (
    <Box>
      <Slider
        w="full"
        defaultValue={petAgeValue}
        onChangeEnd={(value) => setValue(fieldName, value)}
        minValue={0}
        maxValue={100}
        accessibilityLabel={t('REGISTER_ADOPTION.FORM.AGE')}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text textAlign="right">
        {petAgeValue} {t('YEAR')}
      </Text>
    </Box>
  );
}

function PetSizeStep() {
  const { t } = useLocale();

  const options = ['SMALL', 'MEDIUM', 'BIG'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.SIZE.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetSize.fieldName} options={options} />;
}

function PetGenderStep() {
  const { t } = useLocale();

  const options = ['MALE', 'FEMALE'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.GENDER.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetGender.fieldName} options={options} />;
}

function FormSteps({ activeStep }: { activeStep: AdoptionSteps }) {
  switch (activeStep) {
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
