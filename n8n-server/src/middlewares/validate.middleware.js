export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues?.[0]?.message || "Invalid request";

    return res.status(400).json({
      success: false,
      message: firstError,
    });
  }

  req.validated = result.data;
  next();
};
