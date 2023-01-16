import "fast-text-encoding";
import * as Joi from "joi";

export const adoptionValidationSchema = Joi.object({
  id: Joi.string().required(),

  name: Joi.string().max(30),

  gender: Joi.string().max(6),

  breed: Joi.string().max(30),

  type: Joi.string().max(5),

  age: Joi.number(),

  size: Joi.string().max(6),

  observations: Joi.string().allow("").max(100),

  photos: Joi.array().optional().items(Joi.string().uri()),
});

export const createValidationSchema = adoptionValidationSchema
  .fork(["id"], (schema) => schema.forbidden())
  .fork(["name", "gender", "breed", "type", "age", "size"], (schema) =>
    schema.required()
  );
