import { ApiResponse } from "./../configs/response.js";

const _extractFirstErrorMessage = (err) => {
  const errs = err.errors;
  if (!errs || errs.length === 0) {
    console.log(err.message);
    return "Invalid request data";
  }

  console.log(errs);

  const { path, code, message } = errs[0];
  const field = path[1];

  switch (code) {
    case "invalid_string":
      return `${field} invalid`;
    case "invalid_type":
      return message === "Required" ? `${field} required` : `${field} invalid`;
    case "too_small":
      return `${field} required`;
    case "invalid_enum_value":
      return `${field} invalid`;
    default:
      return `${message}`;
  }
};

export const validateRequest = (schema) => (req, res, next) => {
  try {
    const { body } = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.validatedBody = body;
    next();
  } catch (err) {
    const firstError = _extractFirstErrorMessage(err);
    ApiResponse.BadRequest(res, firstError);
  }
};
