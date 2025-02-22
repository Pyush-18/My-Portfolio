import { createTransport } from "nodemailer";
import { ApiError } from "./ApiError.js";

export async function sendMessage({ name, email, message }) {
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
      subject: `${name} 😎`,
      text: message,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Message not send");
  }
}
