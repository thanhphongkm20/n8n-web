import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSubscribeMail = async (email) => {
  return transporter.sendMail({
    from: `"N8N Hub Subscribe" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "New subscriber from N8N Hub",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>New Subscriber</h2>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Time:</strong>
          ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  });
};