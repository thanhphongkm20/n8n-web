import { object, ref, string } from "yup";

// import { roleUtils } from '../utils/auth.util';
import LANGUAGE from "../utils/language.util";

export const userLoginSchema = object({
  email: string()
    .email(LANGUAGE.FIELD_INVALID(LANGUAGE.USER.EMAIL))
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.EMAIL)),
  password: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD),
  ),
});
export const userCreateSchema = object({
  first_name: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.FIRST_NAME),
  ),
  last_name: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.LAST_NAME),
  ),
  email: string()
    .email(LANGUAGE.FIELD_INVALID(LANGUAGE.USER.EMAIL))
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.EMAIL)),
  password: string()
    .min(8, LANGUAGE.PASSWORD.PASSWORD_MIN_LENGTH)
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD)),
  password_repeat: string()
    .oneOf([ref("password")], LANGUAGE.PASSWORD.PASSWORD_MUST_MATCH)
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD)),
});

export const userChangePasswordSchema = object({
  old_password: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.OLD_PASSWORD),
  ),
  new_password: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.NEW_PASSWORD),
  ),
  new_password_repeat: string()
    .oneOf([ref("new_password")], LANGUAGE.PASSWORD.PASSWORD_MUST_MATCH)
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD_CONFIRM)),
});

export const userUpdateProfileSchema = object({
  first_name: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.REGISTER.FIRST_NAME),
  ),
  last_name: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.REGISTER.LAST_NAME),
  ),
});
