import express from "express";
import * as controller from "../controllers/article.controller.js";
import { adminTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { createArticleSchema, updateArticleSchema } from "../requests/article.request.js";

const router = express.Router();

router.get("/", controller.getList);
router.get("/slug/:slug", controller.getBySlug);
router.get("/:id", controller.getDetail);

router.post(
  "/",
  adminTokenRequired,
  validateRequest(createArticleSchema),
  controller.create
);

router.put(
  "/:id",
  adminTokenRequired,
  validateRequest(updateArticleSchema),
  controller.update
);

router.delete("/:id", adminTokenRequired, controller.remove);

export default router;