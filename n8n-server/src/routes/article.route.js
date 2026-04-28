import express from "express";
import * as controller from "../controllers/article.controller.js";
import { adminTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../requests/article.request.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", controller.getList);
router.get("/slug/:slug", controller.getBySlug);
router.get("/:id", controller.getDetail);

router.post("/generate-slug", adminTokenRequired, controller.generateSlugAI);

router.post(
  "/",
  adminTokenRequired,
  (req, res, next) => {
    const isMultipart = req.headers["content-type"]?.includes(
      "multipart/form-data",
    );

    if (isMultipart) {
      return upload.fields([
        { name: "image", maxCount: 1 },
        { name: "workflow", maxCount: 1 },
      ])(req, res, next);
    }

    next();
  },
  validateRequest(createArticleSchema),
  controller.create,
);

router.put(
  "/:id",
  adminTokenRequired,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "workflow", maxCount: 1 },
  ]),
  validateRequest(updateArticleSchema),
  controller.update,
);

router.delete("/:id", adminTokenRequired, controller.remove);

export default router;
