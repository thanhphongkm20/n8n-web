import _ from "lodash";

import { ApiResponse } from "../configs/response.js";
import { buildSearchQuery } from "../utils/query.util.js";
import { CONSTANTS } from "../configs/constants.js";
import {
  generateRandomSalt,
  hashPassword,
  verifyPassword,
} from "../utils/hash.util.js";
import { jwtEncode } from "../utils/jwt.util.js";
import { logError } from "../configs/logger.js";
import { messageUser } from "../configs/messages.js";
import { User } from "../models/user.model.js";
import { USER_ROLE, USER_STATUS, USER_SEARCH_FIELDS } from "../configs/enum.js";
import userService from "../service/user.service.js";

const initAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await userService.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists, skipping initialization");
      return;
    }

    const randomSalt = generateRandomSalt();
    const hashedPass = await hashPassword("admin@example.com", randomSalt);

    // Default admin credentials
    const adminData = new User({
      email: "admin@example.com",
      salt: randomSalt,
      password: hashedPass,
      first_name: "System",
      last_name: "Administrator",
      display_name: "System Administrator",
      role: "admin",
    });

    // TODO: Create admin user in database
    const adminSaved = await userService.save(adminData);

    console.log(`Admin user initialized successfully: ${adminSaved.email}`);
  } catch (error) {
    logError(error);
  }
};

// ===== AUTH =====
const login = async (req, res) => {
  try {
    const user = await userService.findByEmailForAuth(req.body.email);
    if (!user) return ApiResponse.NotFound(res, messageUser.USER_LOGIN_FAILED);

    if (user.status === USER_STATUS.INACTIVE) {
      return ApiResponse.Forbidden(res, messageUser.USER_INACTIVE);
    }

    const isValid = await verifyPassword(
      req.body.password,
      user.password,
      user.salt,
    );
    if (!isValid)
      return ApiResponse.BadRequest(res, messageUser.USER_LOGIN_FAILED);

    user.password = undefined;
    user.salt = undefined;

    const access_token = jwtEncode(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
      },
      CONSTANTS.JWT_SECRET_KEY,
      CONSTANTS.JWT_EXPIRES_SIGNIN,
    );

    return ApiResponse.OK(res, { user, access_token });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const verifyToken = (req, res) => {
  return ApiResponse.OK(res, { user: req.user });
};

// ===== USER =====
const userById = async (req, res, next) => {
  try {
    const user = await userService.findOne({ _id: req.params.id });
    if (!user)
      return ApiResponse.NotFound(res, messageUser.USER_DOES_NOT_EXIST);

    req.targetUser = user;
    next();
  } catch (err) {
    ApiResponse.InternalServerError(res, err);
  }
};

const getById = (req, res) => {
  return ApiResponse.OK(res, req.targetUser);
};

const create = async (req, res) => {
  try {
    const userData = req.validatedBody;

    const existingEmail = await userService.findOne({ email: userData.email });
    if (existingEmail) {
      return ApiResponse.BadRequest(res, messageUser.USER_EXISTED_WITH_EMAIL);
    }

    const existingPhone = await userService.findOne({ phone: userData.phone });
    if (existingPhone) {
      return ApiResponse.BadRequest(res, "PHONE_EXISTED");
    }

    const salt = generateRandomSalt();
    const password = await hashPassword(userData.password, salt);

    userData.salt = salt;
    userData.password = password;
    userData.display_name = userData.full_name;
    userData.created_by = req.user ? req.user.id : null;
    userData.role = USER_ROLE.USER;

    const saved = await userService.create(userData);
    return ApiResponse.Created(res, saved);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const userTarget = req.targetUser;
    const userData = req.validatedBody;

    if (userData.email && userData.email !== userTarget.email) {
      const existingUser = await userService.findOne({ email: userData.email });
      if (existingUser) {
        return ApiResponse.BadRequest(res, messageUser.USER_EXISTED);
      }
    }

    const updated = Object.assign(userTarget, userData);
    updated.display_name = `${updated.last_name} ${updated.first_name}`;

    const result = await userService.save(updated);
    return ApiResponse.OK(res, result);
  } catch (err) {
    ApiResponse.InternalServerError(res, err);
  }
};

const list = async (req, res) => {
  try {
    let query = {};

    query.role =
      req.user.role === USER_ROLE.ADMIN
        ? { $ne: USER_ROLE.ADMIN }
        : { $in: [USER_ROLE.USER] };

    const searchQuery = buildSearchQuery(req.query.search, USER_SEARCH_FIELDS);
    if (searchQuery) query = { ...query, ...searchQuery };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const { users, count } = await userService.list(
      query,
      (page - 1) * limit,
      limit,
    );

    return ApiResponse.OK(res, { users, count });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

// ===== PROFILE =====
const profile = (req, res) => {
  const user = req.user.toObject();
  delete user.password;
  delete user.salt;

  return ApiResponse.OK(res, user);
};

const profileUpdate = async (req, res) => {
  try {
    const updated = _.merge(req.user, req.validatedBody);
    updated.display_name = `${updated.last_name} ${updated.first_name}`;

    const result = await userService.save(updated);
    return ApiResponse.OK(res, result);
  } catch (err) {
    ApiResponse.InternalServerError(res, err);
  }
};

export default {
  initAdminUser,
  login,
  verifyToken,
  create,
  update,
  getById,
  userById,
  list,
  profile,
  profileUpdate,
};
