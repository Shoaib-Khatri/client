import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, carId } = await req.json();

    const { sendEmail } = await import("@/lib/email");
    const info = await sendEmail(
      process.env.CONTACT_EMAIL || process.env.EMAIL_USER || "",
      `New Inquiry from ${name} ${carId ? `re: Car ID ${carId}` : ""}`,
      `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      `
        <h3>New Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    );

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ err: "Failed to send email" }, { status: 500 });
  }
}
