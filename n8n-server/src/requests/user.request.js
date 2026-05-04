import z from "zod";
import { USER_ROLE, USER_STATUS } from "../configs/enum.js";

const DEFAULT_ROLE = USER_ROLE.USER;
const ROLE_VALUES = Object.values(USER_ROLE);
const STATUS_VALUES = Object.values(USER_STATUS);

export const userLoginRequest = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const userCreateRequest = z.object({
  full_name: z.string().trim().nonempty("Full name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().trim().nonempty("Password is required"),
  phone: z.string().trim().optional(),
  profile_image: z.string().trim().optional(),
});

export const userUpdateRequest = z.object({
  display_name: z.string().trim().optional(),
  email: z.string().email().nonempty(),
  phone: z.string().trim().optional(),
});

export const userUpdateProfileRequest = z.object({
  body: z.object({
    full_name: z.string().trim().optional(),
    email: z.email().nonempty(),
    phone: z.string().trim().optional(),
    profile_image: z.string().trim().optional(),
    avatar: z.string().trim().optional(),
  }),
});

export const userChangePassRequest = z.object({
  body: z
    .object({
      old_password: z.string().trim().nonempty(),
      new_password: z.string().trim().nonempty(),
      new_password_repeat: z.string().trim().nonempty(),
    })
    .refine((data) => data.new_password === data.new_password_repeat, {
      message: "new_password_repeat は new_password と一致する必要があります",
      path: ["new_password_repeat"],
    }),
});
