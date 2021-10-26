import React, {useState, useCallback, useContext, createContext, cloneElement, ReactElement} from 'react';
import {Platform} from 'react-native';
import {useForm, Controller, ControllerRenderProps, FieldValues, UseFormHandleSubmit} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {useI18n} from '@animavita/i18n';

import {InputData} from './form';

interface RegisteredInputProps {
  data: InputData;
}

interface AdoptionContextProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  RegisteredInput: React.FC<RegisteredInputProps>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: {
    [key: string]: string;
  };
  pickImage: () => void;
  requestPermission: () => void;
  images: Array<Partial<ImagePicker.ImagePickerResult>>;
}

const NUM_OF_STEPS = 2;

const AdoptionContext = createContext<AdoptionContextProps>({} as AdoptionContextProps);

const AdoptionProvider: React.FC = ({children}) => {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState(ImagePicker.PermissionStatus.UNDETERMINED);
  const [images, setImages] = useState<Array<Partial<ImagePicker.ImagePickerResult>>>([{}, {}, {}]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {t} = useI18n(['register_adoption']);

  const nextStep = useCallback(() => {
    if (step < NUM_OF_STEPS) {
      setStep(step + 1);
    }
  }, [step]);

  const previousStep = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const requestPermission = async () => {
    try {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setStatus(status);
      }
    } catch {
      // TODO: Create a proper error handling with an alert component
      throw new Error('Error trying to request media library permission');
    }
  };

  const pickImage = async () => {
    if (status === ImagePicker.PermissionStatus.GRANTED) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.cancelled) {
        setImages([result]);
      }
    } else {
      await requestPermission();
    }
  };

  const RegisteredInput: React.FC<RegisteredInputProps> = ({children, data}) => {
    const givePropsAccordingToType = ({onChange, value}: ControllerRenderProps<FieldValues, string>) => {
      switch (data.type) {
        case 'text':
          return {
            onChangeText: onChange,
            value,
          };
        case 'buttonGroup':
          return {
            onChange,
            value,
          };
        case 'slider':
          const formatedValue = Math.ceil(value);
          return {
            onValueChange: onChange,
            value: formatedValue,
            suffix: formatedValue === 1 ? t('inputs.age.suffix.singular') : t('inputs.age.suffix.plural'),
          };
        default:
          return data;
      }
    };

    if (children) {
      return (
        <Controller
          control={control}
          rules={data.rules}
          render={({field}) => cloneElement(children as ReactElement, givePropsAccordingToType(field))}
          name={data.name}
          defaultValue={data.defaultValue}
        />
      );
    } else {
      throw new Error('RegisteredInput must have a child element.');
    }
  };

  return (
    <AdoptionContext.Provider
      value={{
        step,
        nextStep,
        previousStep,
        RegisteredInput,
        handleSubmit,
        errors,
        pickImage,
        requestPermission,
        images,
      }}>
      {children}
    </AdoptionContext.Provider>
  );
};

const useAdoptionRegister = () => {
  const context = useContext(AdoptionContext);

  if (!context) {
    throw new Error('useAdoptionRegister must be used within an AdoptionProvider.');
  }

  return context;
};

export {AdoptionProvider, useAdoptionRegister};
