import express from "express";

import { blogController } from "../controllers/blog.controller.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

import {
  createBlogRequest,
  updateBlogRequest,
} from "../requests/blog.request.js";

const router = express.Router();

router.get("/", blogController.getAll);

router.get("/slug/:slug", blogController.getBySlug);

router.get("/:id", blogController.getById);

router.post(
  "/",
  validateRequest(createBlogRequest),
  blogController.create
);

router.put(
  "/:id",
  validateRequest(updateBlogRequest),
  blogController.update
);

router.delete("/:id", blogController.remove);

export default router;