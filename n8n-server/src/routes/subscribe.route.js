import express from "express";
import { sendSubscribeMail } from "../middlewares/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    await sendSubscribeMail(email);

    return res.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;