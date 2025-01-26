import React from 'react';
import { useFormContext } from 'react-hook-form';

import PetUploadPhotosStep from './pet-upload-photos-step/pet-upload-photos-step.component';

import { stepsLibrary } from '@/components/pet-form/pet-form.constants';
import { AdoptionSteps } from '@/components/pet-form/pet-form.types';
import { RHFInput, RHFListSelector } from '@/components/react-hook-form/native-base';
import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const commonInputProperties = {
  size: 'xl',
  borderColor: theme.colors.primary[600],
  variant: 'outline',
  autoFocus: true,
};

const PetNameStep = () => {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER'),
        testID: 'adoption-form-name-input',
        returnKeyType: 'next',
        isRequired: true,
      }}
      control={control}
      name={stepsLibrary.PetName.fieldName}
    />
  );
};

const PetBreedStep = () => {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER'),
        testID: 'adoption-form-breed-input',
      }}
      control={control}
      name={stepsLibrary.PetBreed.fieldName}
    />
  );
};

const PetObservationsStep = () => {
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
};

const PetTypeStep = () => {
  const { t } = useLocale();

  const options = ['dog', 'cat', 'other'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type.toUpperCase()}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetType.fieldName} options={options} />;
};

const PetAgeStep = () => {
  const { t } = useLocale();

  const options = ['puppy', 'young', 'adult', 'senior'].map((age) => ({
    label: t(`REGISTER_ADOPTION.FORM.AGE_OPTIONS.${age.toUpperCase()}`),
    value: age,
  }));

  return <RHFListSelector name={stepsLibrary.PetAge.fieldName} options={options} />;
};

const PetSizeStep = () => {
  const { t } = useLocale();

  const options = ['small', 'medium', 'big'].map((size) => ({
    label: t(`REGISTER_ADOPTION.FORM.SIZE.${size.toUpperCase()}`),
    value: size,
  }));

  return <RHFListSelector name={stepsLibrary.PetSize.fieldName} options={options} />;
};

const PetGenderStep = () => {
  const { t } = useLocale();

  const options = ['male', 'female'].map((gender) => ({
    label: t(`REGISTER_ADOPTION.FORM.GENDER.${gender.toUpperCase()}`),
    value: gender,
  }));

  return <RHFListSelector name={stepsLibrary.PetGender.fieldName} options={options} />;
};

const FormSteps = ({ activeStep }: { activeStep: AdoptionSteps }) => {
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
    case AdoptionSteps.PetPhotos:
      return <PetUploadPhotosStep />;
    default:
      return null;
  }
};

export default FormSteps;
