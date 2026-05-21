import express from "express";
import userRoute from "./user.route.js";
import articleRoute from "./article.route.js";
import quoteRoutes from "./quote.route.js"
import resourceRoute from "./resource.route.js";
import blogRoute from "./blog.route.js";
import orderRoute from "./order.route.js";
import subscribeRoute from "./subscribe.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/articles", articleRoute);
router.use("/quotes", quoteRoutes);
router.use("/resources", resourceRoute);
router.use("/blogs", blogRoute);
router.use("/orders", orderRoute);
router.use("/subscribe", subscribeRoute);


export default router;