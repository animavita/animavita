import * as ImagePicker from 'expo-image-picker';

const NUM_OF_STEPS = 2;

export type ImageType = ImagePicker.ImagePickerResult;
type Step = number;

export type ImageState = Partial<ImageType>[];

export enum ActionTypes {
  AddImage = 'ADD_IMAGE',
  RemoveImage = 'REMOVE_IMAGE',
  NextStep = 'NEXT_STEP',
  PreviousStep = 'PREVIOUS_STEP',
}

type AddImageAction = {
  type: ActionTypes.AddImage;
  payload: {
    image: ImageType;
  };
};

type RemoveImageAction = {
  type: ActionTypes.RemoveImage;
  payload: {
    index: number;
  };
};

export type ImagesAction = AddImageAction | RemoveImageAction;

export type StepsAction = {
  type: ActionTypes.NextStep | ActionTypes.PreviousStep;
};

const imagesReducer = (state: ImageState, action: ImagesAction) => {
  switch (action.type) {
    case ActionTypes.AddImage:
      return [...state, action.payload.image];
    case ActionTypes.RemoveImage:
      const stateCopy = [...state];
      stateCopy.splice(action.payload.index, 1);

      return stateCopy;
  }
};

const stepsReducer = (state: Step, action: StepsAction) => {
  switch (action.type) {
    case ActionTypes.NextStep:
      if (state < NUM_OF_STEPS) {
        return state + 1;
      }
      return state;
    case ActionTypes.PreviousStep:
      if (state > 0) {
        return state - 1;
      }
      return state;
  }
};

export {imagesReducer, stepsReducer};
