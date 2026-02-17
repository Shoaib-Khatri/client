import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.warn(
    "EMAIL_USER or EMAIL_PASS environment variables are not defined.",
  );
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
) => {
  if (!emailUser) {
    throw new Error("Cannot send email: EMAIL_USER is not defined");
  }

  const info = await transporter.sendMail({
    from: `"Plate Builder" <${emailUser}>`,
    to,
    subject,
    text,
    html,
  });

  return info;
};
