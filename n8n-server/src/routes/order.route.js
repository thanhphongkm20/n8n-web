import express from "express";
import {
  createOrder,
  getOrder,
  markOrderPaid,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);

router.patch("/:id/paid", markOrderPaid);

export default router;