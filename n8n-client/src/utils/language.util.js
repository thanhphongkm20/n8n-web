const LANGUAGE = {
  /* General */
  FIELD_REQUIRED: (field) => `${field} is required`,
  FIELD_INVALID: (field) => `${field} is invalid`,

  GENERAL: {
    REQUIRED: "Required",
    EMAIL_ADDRESS: "Email address",
  },

  USER: {
    EMAIL: "Email",
    FIRST_NAME: "First name",
    LAST_NAME: "Last name",
    ROLE: "Role",
    PHONE: "Phone",
    FULL_NAME: "Full name",
    DISPLAY_NAME: "Display name",
  },

  PASSWORD: {
    PASSWORD: "Password",
    NEW_PASSWORD: "New password",
    OLD_PASSWORD: "Old password",
    PASSWORD_CONFIRM: "Confirm password",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    PASSWORD_MUST_MATCH: "Passwords must match",
  },

  REGISTER: {
    FIRST_NAME: "First name",
    LAST_NAME: "Last name",
  },

  BUTTON: {
    CONFIRM: "Confirm",
    CANCEL: "Cancel",
    DELETE: "Delete",
    DEACTIVATE: "Deactivate",
    UPDATE: "Update",
  },

  ARTICLE: {
    ARTICLE_TITLE: "Article title",
  },
};

export default LANGUAGE;
