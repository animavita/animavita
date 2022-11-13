import * as Joi from "joi";

const coordinates = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
})

export const userValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  location: coordinates,
  photoUri: Joi.string(),
});


