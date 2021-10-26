import React, {useState, useEffect, useContext, useReducer, createContext, cloneElement, ReactElement} from 'react';
import {Platform} from 'react-native';
import {useForm, Controller, ControllerRenderProps, FieldValues} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {useI18n} from '@animavita/i18n';
import {useNavigation} from '@react-navigation/native';

import {imagesReducer, stepsReducer, ActionTypes, ImageType, ImageState} from './reducers';
import {InputData, Fields} from './form';

interface RegisteredInputProps {
  data: InputData;
}

interface AdoptionContextProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  RegisteredInput: React.FC<RegisteredInputProps>;
  submitData: () => void;
  errors: {
    [key: string]: string;
  };
  pickImage: () => void;
  requestPermission: () => void;
  images: ImageState;
  addImage: (image: ImageType) => void;
  removeImage: (index: number) => void;
  data: Partial<Fields>;
  submitAdoption: () => void;
}

const AdoptionContext = createContext<AdoptionContextProps>({} as AdoptionContextProps);

const AdoptionProvider: React.FC = ({children}) => {
  const [status, setStatus] = useState(ImagePicker.PermissionStatus.UNDETERMINED);
  const [step, dispatchStep] = useReducer(stepsReducer, 0);
  const [images, dispatchImages] = useReducer(imagesReducer, []);
  const [data, setData] = useState<Partial<Fields>>({});

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {t} = useI18n(['register_adoption']);

  const navigation = useNavigation();

  const nextStep = () => dispatchStep({type: ActionTypes.NextStep});

  const previousStep = () => dispatchStep({type: ActionTypes.PreviousStep});

  const addImage = (image: ImageType) =>
    dispatchImages({
      type: ActionTypes.AddImage,
      payload: {
        image,
      },
    });

  const removeImage = (index: number) =>
    dispatchImages({
      type: ActionTypes.RemoveImage,
      payload: {
        index,
      },
    });

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
        addImage(result);
      }
    } else {
      await requestPermission();
    }
  };

  const submitData = handleSubmit(formData => {
    setData(formData);
    nextStep();
  });

  const submitAdoption = () => {
    navigation.navigate('Home');
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

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <AdoptionContext.Provider
      value={{
        step,
        nextStep,
        previousStep,
        RegisteredInput,
        submitData,
        errors,
        pickImage,
        requestPermission,
        images,
        addImage,
        removeImage,
        data,
        submitAdoption,
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
