import { createTransport } from "nodemailer";
import { ApiError } from "./ApiError.js";

export async function sendMessage({ subject, email, message }) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });   
  try {
    const data = await transporter.sendMail({
      from: email,
      to: process.env.APP_EMAIL,
      subject: `${subject} 😎`,
      text: message,
    });
    return data;
  } catch (error) {
    throw new ApiError(500, "Message not send");
  }
}
