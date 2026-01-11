// https://github.com/hapijs/joi/issues/2141
import "fast-text-encoding";
import * as Joi from "joi";

import { MIN_PHOTOS_REQUIRED } from "@animavita/types";

const imageStateSchema = Joi.object({
  uri: Joi.string().required(),
  isUploaded: Joi.boolean().required(),
  error: Joi.string().forbidden().messages({
    'any.unknown': 'Photo has a validation error',
  }),
});

const photosArraySchema = Joi.array()
  .items(imageStateSchema)
  .custom((value, helpers) => {
    const validPhotos = value.filter((photo: any) => photo.uri && !photo.error);
    
    if (validPhotos.length < MIN_PHOTOS_REQUIRED) {
      const hasErrorPhotos = value.some((photo: any) => photo.error);
      if (hasErrorPhotos) {
        return helpers.error('photos.hasErrors');
      }
      return helpers.error('array.min', { limit: MIN_PHOTOS_REQUIRED });
    }
    
    return value;
  })
  .messages({
    'array.min': `At least ${MIN_PHOTOS_REQUIRED} photos are required`,
    'photos.hasErrors': 'Fix photo errors before proceeding',
  });

export const adoptionValidationSchema = Joi.object({
  id: Joi.string().optional(),

  name: Joi.string().max(30),

  gender: Joi.string().max(6),

  breed: Joi.string().max(30),

  type: Joi.string().max(5),

  maturity: Joi.string().max(6),

  size: Joi.string().max(6),

  observations: Joi.string().allow("").max(100),

  photos: photosArraySchema,
});
