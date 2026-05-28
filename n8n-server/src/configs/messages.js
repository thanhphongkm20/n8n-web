export const messageGeneral = {
  SOMETHING_WRONG: "An unexpected error occurred",
  ACCESS_DENIED: "Access denied. You do not have permission",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Resource not found",
  TOO_MANY_REQUESTS: "Too many requests",
  SERVICE_UNAVAILABLE: "Service is unavailable",
};

export const messageRequired = (string) => `${string} is required`;

export const messageInvalid = (string) => `${string} is invalid`;

export const messageNotFound = (string) => `${string} not found`;

export const messageDeleted = (string) => `${string} has been deleted successfully`;

export const messageExisted = (string) => `${string} already exists`;

export const messageUser = {
  USER_LOGIN_FAILED: "Invalid email or password",
  USER_EXISTED: "User already exists",
  USER_EXISTED_WITH_EMAIL: "A user with this email already exists",
  USER_DOES_NOT_EXIST: "User does not exist",
  PASSWORD_OLD_INCORRECT: "Current password is incorrect",
  PASSWORD_CONFIRM_NOT_MATCH: "New password and confirmation do not match",
  PASSWORD_CHANGED: "Password has been changed successfully",
  SEND_MAIL_FAILED: "Failed to send email. Please try again later",
  SEND_MAIL_SUCCESS: "Password reset instructions have been sent via email",
  OTP_SENT_SUCCESS: "Verification code has been sent via email",
  OTP_INVALID: "Invalid verification code",
  OTP_EXPIRED: "Verification code has expired",
  USER_NOT_FOUND: "User not found",
  USER_INACTIVE: "Account is inactive. Please contact the administrator",
};

export const BLOG_MESSAGES = {
  CREATE_SUCCESS: "Create blog successfully",
  GET_ALL_SUCCESS: "Get blogs successfully",
  GET_SUCCESS: "Get blog successfully",
  UPDATE_SUCCESS: "Update blog successfully",
  DELETE_SUCCESS: "Delete blog successfully",
};

export const ORDER_MESSAGES = {
  ARTICLE_NOT_FOUND: "Article not found",
  ORDER_NOT_FOUND: "Order not found",
  CREATE_ORDER_FAILED: "Failed to create order",
  GET_ORDER_FAILED: "Failed to get order",
  UPDATE_ORDER_FAILED: "Failed to update order",
};

export const ARTICLE_MESSAGES = {
  IMAGE_REQUIRED: "Image is required",
  TITLE_REQUIRED: "Title is required",

  ARTICLE_NOT_FOUND: "Article not found",

  EMPTY_AI_RESPONSE: "Empty AI response",

  CREATE_FAILED: "Failed to create article",
  UPDATE_FAILED: "Failed to update article",
  DELETE_FAILED: "Failed to delete article",
  GET_DETAIL_FAILED: "Failed to get article detail",
  GET_LIST_FAILED: "Failed to get article list",
  GET_BY_SLUG_FAILED: "Failed to get article by slug",
  GENERATE_SLUG_FAILED: "Failed to generate slug",
};

export const QUOTE_MESSAGES = {
  CREATE_SUCCESS: "Quote request sent successfully",
  PROCESS_FAILED: "Failed to process request",
};

export const RESOURCE_MESSAGES = {
  CREATE_SUCCESS: "Create resource successfully",
  GET_LIST_SUCCESS: "Get resources successfully",
  GET_SUCCESS: "Get resource successfully",
  UPDATE_SUCCESS: "Update resource successfully",
  DELETE_SUCCESS: "Delete resource successfully",
};

export const SUBSCRIBE_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  INVALID_EMAIL: "Invalid email",

  SUBSCRIBE_SUCCESS: "Subscribed successfully",

  INTERNAL_SERVER_ERROR: "Internal server error",
};