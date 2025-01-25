// https://github.com/hapijs/joi/issues/2141
import "fast-text-encoding";
import * as Joi from "joi";

export const adoptionValidationSchema = Joi.object({
  id: Joi.string().optional(),

  name: Joi.string().max(30),

  gender: Joi.string().max(6),

  breed: Joi.string().max(30),

  type: Joi.string().max(5),

  age: Joi.string().max(6),

  size: Joi.string().max(6),

  observations: Joi.string().allow("").max(100),

  photos: Joi.array().optional().items(Joi.string().uri()),
});
