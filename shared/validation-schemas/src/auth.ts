import { userValidationSchema } from "./user";

export const signUpValidationSchema = userValidationSchema
  .fork(["id"], (schema) => schema.forbidden())
  .fork(["name", "email", "password", "location"], (schema) =>
    schema.required()
  );

export const signInValidationSchema = userValidationSchema
  .fork(["id"], (schema) => schema.forbidden())
  .fork(["email", "password"], (schema) =>
    schema.required()
  );
