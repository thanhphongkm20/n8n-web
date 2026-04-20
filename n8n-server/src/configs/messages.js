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

export const messageArticle = {
  NOT_FOUND: "Record not found",
  NO_EDIT_PERMISSION: "You do not have permission to edit this record",
  NO_DELETE_PERMISSION: "You do not have permission to delete this record",
  NO_VIEW_PERMISSION: "You do not have permission to view this record",
  DELETED: "Record has been deleted",
};

export const messageAttachment = {
  NO_FILE_SELECTED: "No file selected",
};

export const messageCategory = {
  NOT_FOUND: "Category not found",
  DELETED: "Category has been deleted",
  SLUG_EXISTS: "This slug is already in use",
  HAS_ARTICLES: "This category contains articles",
  MAX_DEPTH_EXCEEDED: "Categories support a maximum of 2 levels",
};

export const messageGemini = {
  SERVICE_UNAVAILABLE: "AI service is currently unavailable. Please try again later",
  MESSAGE_BLOCKED: "Message was blocked. Please rephrase your input",
  TOO_MANY_REQUESTS: "Too many requests. Please try again later",
  ACCESS_DENIED: "Access denied",
  SOMETHING_WRONG: "An error occurred. Please try again later",
};