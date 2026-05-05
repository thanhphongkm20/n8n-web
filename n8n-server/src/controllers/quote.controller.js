// controllers/quote.controller.js
import { Quote } from "../models/quote.model.js";
import { sendQuoteEmail } from "../service/quote.service.js";

export const createQuote = async (req, res) => {
  try {
    const data = req.validatedBody;

    const newQuote = await Quote.create(data);

    await sendQuoteEmail(data);

    return res.json({
      success: true,
      message: "Quote request sent successfully",
      data: newQuote
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to process request",
    });
  }
};