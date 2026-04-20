import { CONSTANTS } from "../configs/constants.js";
import { USER_STATUS } from "../configs/enum.js";
import { messageUser } from "../configs/messages.js";
import userService from "../service/user.service.js";
import { jwtDecode } from "../utils/jwt.util.js";
import { ApiResponse } from "./../configs/response.js";

const extractToken = (authorizationHeader) => {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;
  return authorizationHeader.split(" ")[1];
};

const getUserFromToken = async (token) => {
  const decoded = jwtDecode(token, CONSTANTS.JWT_SECRET_KEY);
  if (!decoded?.sub) return null;

  const user = await userService.findByIdForAuth(decoded.sub);
  if (!user || user.status === USER_STATUS.INACTIVE) return null;

  delete user.reset_password_token;
  return user;
};

// Middleware yêu cầu login
const tokenRequired = (requiredRole = null) => async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) return ApiResponse.Unauthorized(res);

    const user = await getUserFromToken(token);
    if (!user) return ApiResponse.Unauthorized(res);

    if (requiredRole && user.role !== requiredRole) {
      return ApiResponse.Forbidden(res, messageUser.ACCESS_DENIED);
    }

    req.user = user;
    next();
  } catch (err) {
    ApiResponse.InternalServerError(res, err);
  }
};

// Middleware optional
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      req.user = null;
      return next();
    }

    const user = await getUserFromToken(token);
    req.user = user;
    next();
  } catch (err) {
    ApiResponse.InternalServerError(res, err);
  }
};

// Export
export const allTokenRequired = tokenRequired();
export const adminTokenRequired = tokenRequired("admin");
export const userTokenRequired = tokenRequired("user");