import express from "express";

import { userController } from "../controllers/index.js";
import { allTokenRequired, adminTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  userLoginRequest,
  userUpdateProfileRequest,
  userUpdateRequest,
  userCreateRequest
} from "../requests/user.request.js";
import { objectIdSchema } from "../requests/base.request.js";

const router = express.Router();

router.get(
  "/verify-token",
  allTokenRequired,
  userController.verifyToken
);

router.post(
  "/login",
  validateRequest(userLoginRequest),
  userController.login,
);

router.get(
  "/:id",
  adminTokenRequired,
  validateRequest(objectIdSchema),
  userController.userById,
  userController.getById
);

router.get(
  "/",
  adminTokenRequired,
  userController.list,
);

router.post(
  "/",
  validateRequest(userCreateRequest),
  userController.create
);

router.get(
  "/profile",
  allTokenRequired,
  userController.profile,
);

router.put(
  "/profile",
  allTokenRequired,
  validateRequest(userUpdateProfileRequest),
  userController.profileUpdate,
);

router.put(
  "/:id",
  adminTokenRequired,
  validateRequest(objectIdSchema),
  validateRequest(userUpdateRequest),
  userController.userById,
  userController.update,
);

export default router;