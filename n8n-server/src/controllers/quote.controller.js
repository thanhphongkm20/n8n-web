// controllers/quote.controller.js
import { createQuote as createQuoteService } from "../service/quote.service.js";

export const createQuote = async (req, res) => {
  try {
    const data = req.validatedBody;

    const newQuote = await createQuoteService(data);

    return res.json({
      success: true,
      message: "Quote request sent successfully",
      data: newQuote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to process request",
    });
  }
};
