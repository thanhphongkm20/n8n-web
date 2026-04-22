import { object, ref, string } from "yup";

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
  full_name: string().required(
    LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.FULL_NAME),
  ),
  phone: string().required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.PHONE)),
  email: string()
    .email(LANGUAGE.FIELD_INVALID(LANGUAGE.USER.EMAIL))
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.EMAIL)),
  password: string()
    .min(8, LANGUAGE.PASSWORD.PASSWORD_MIN_LENGTH)
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD)),
  password_confirm: string()
    .oneOf([ref("password")], LANGUAGE.PASSWORD.PASSWORD_MUST_MATCH)
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.PASSWORD.PASSWORD_CONFIRM)),
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
