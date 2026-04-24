export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const firstError =
      result.error.issues?.[0]?.message || "Invalid request";

    return ApiResponse.BadRequest(res, firstError);
  }

  req.validated = result.data; // 🔥 đổi tên
  next();
};