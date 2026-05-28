import { Quote } from "../models/quote.model.js";
import { mailTransporter } from "../configs/mail.config.js";

export const createQuote = async (data) => {
  const newQuote = await Quote.create(data);

  await sendQuoteEmail(data);

  return newQuote;
};

export const sendQuoteEmail = async (data) => {
  const html = `
    <h2>🚀 New Automation Quote Request</h2>
    <p><b>Company:</b> ${data.companyName}</p>
    <p><b>Contact:</b> ${data.contactPerson}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Budget:</b> ${data.budget}</p>
    <p><b>Timeline:</b> ${data.timeline}</p>
    <p><b>Description:</b></p>
    <p>${data.description}</p>
  `;

  return mailTransporter.sendMail({
    from: `"N8N System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "🔥 New Custom Workflow Request",
    html,
  });
};
