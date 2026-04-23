import { ApiResponse } from "./../configs/response.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {

    const firstError = error.details[0].message.replace(/[\\"]/g, "");
    return ApiResponse.BadRequest(res, firstError);
  }
  req.validatedBody = value;
  next();
};