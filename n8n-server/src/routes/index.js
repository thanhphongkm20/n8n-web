import express from "express";
import userRoute from "./user.route.js";
import articleRoute from "./article.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/articles", articleRoute);

export default router;