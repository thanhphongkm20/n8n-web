import { SUBSCRIBE_MESSAGES } from "../configs/messages.js";
import { sendSubscribeMail } from "../middlewares/mailer.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: SUBSCRIBE_MESSAGES.EMAIL_REQUIRED,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: SUBSCRIBE_MESSAGES.INVALID_EMAIL,
      });
    }

    await sendSubscribeMail(email);

    return res.status(200).json({
      success: true,
      message: SUBSCRIBE_MESSAGES.SUBSCRIBE_SUCCESS,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: SUBSCRIBE_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};