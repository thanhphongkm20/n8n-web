import { model, Schema } from "mongoose";

import { USER_ROLE, USER_STATUS } from "../configs/enum.js";
import { BaseSchema } from "./base.model.js";

const UserSchema = BaseSchema({
  first_name: String,
  last_name: String,
  display_name: String,
  phone: String,
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: { type: String, select: false },
  salt: { type: String, select: false },
  avatar: { type: String, required: false },
  role: {
    type: String,
    enum: USER_ROLE,
    default: "user",
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
});

export const User = model("User", UserSchema);
