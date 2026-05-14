import express from "express";

import { resourceController } from "../controllers/resource.controller.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

import {
  createResourceRequest,
  updateResourceRequest,
} from "../requests/resource.request.js";

const router = express.Router();

router.get("/", resourceController.getAll);

router.get("/slug/:slug", resourceController.getBySlug);

router.get("/:id", resourceController.getById);

router.post(
  "/",
  validateRequest(createResourceRequest),
  resourceController.create
);

router.put(
  "/:id",
  validateRequest(updateResourceRequest),
  resourceController.update
);

router.delete("/:id", resourceController.remove);

export default router;