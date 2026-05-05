import express from "express";
import { createQuote } from "../controllers/quote.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { quoteRequest } from "../requests/quote.request.js";

const router = express.Router();

router.post("/quote", validateRequest(quoteRequest), createQuote);

export default router;