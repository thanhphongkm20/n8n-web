import express from "express";
import userRoute from "./user.route.js";
import articleRoute from "./article.route.js";
import quoteRoutes from "./quote.route.js"
import resourceRoute from "./resource.route.js";
import blogRoute from "./blog.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/articles", articleRoute);
router.use("/", quoteRoutes);
router.use("/resources", resourceRoute);
router.use("/blogs", blogRoute);

export default router;