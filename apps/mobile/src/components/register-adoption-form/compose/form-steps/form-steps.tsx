import React from 'react';
import { useFormContext } from 'react-hook-form';

import PetUploadPhotosStep from './pet-upload-photos-step/pet-upload-photos-step.component';

import { RHFInput, RHFListSelector } from '@/components/react-hook-form/native-base';
import { stepsLibrary } from '@/components/register-adoption-form/adoption-form.constants';
import { AdoptionSteps } from '@/components/register-adoption-form/adoption-form.types';
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

  const options = ['DOG', 'CAT', 'OTHER'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetType.fieldName} options={options} />;
};

const PetAgeStep = () => {
  const { t } = useLocale();

  const options = ['PUPPY', 'YOUNG', 'ADULT', 'SENIOR'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.AGE_OPTIONS.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetAge.fieldName} options={options} />;
};

const PetSizeStep = () => {
  const { t } = useLocale();

  const options = ['SMALL', 'MEDIUM', 'BIG'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.SIZE.${type}`),
    value: type,
  }));

  return <RHFListSelector name={stepsLibrary.PetSize.fieldName} options={options} />;
};

const PetGenderStep = () => {
  const { t } = useLocale();

  const options = ['MALE', 'FEMALE'].map((type) => ({
    label: t(`REGISTER_ADOPTION.FORM.GENDER.${type}`),
    value: type,
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
