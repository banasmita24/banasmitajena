import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db, contactMessagesTable } from "@workspace/db";
import nodemailer from "nodemailer";

const router: IRouter = Router();

async function sendEmailNotification(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];

  if (!user || !pass) {
    console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },

      family: 4, 

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      tls: {
        rejectUnauthorized: false,
      },
    });
    // ✅ Verify connection (debug)
    await transporter.verify();
    console.log("SMTP READY");

    // ✅ Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: user,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 100px;">From:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Subject:</td>
              <td style="padding: 8px;">${subject}</td>
            </tr>
          </table>
          <hr style="margin: 16px 0; border-color: #e5e7eb;" />
          <h3 style="color: #374151;">Message:</h3>
          <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          <hr style="margin: 16px 0; border-color: #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px;">Sent via your portfolio contact form.</p>
        </div>
      `,
    });

    console.log(`✅ Email sent from: ${name} <${email}> — Subject: ${subject}`);
  } catch (err: any) {
    console.error("❌ Email send failed (non-fatal):", err.message);
  }
}

router.post("/contact", async (req, res) => {
  try {
    const parseResult = SubmitContactBody.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: "Invalid input. Please check all fields and try again.",
      });
      return;
    }

    const { name, email, subject, message } = parseResult.data;

    // ✅ Save to DB
    await db.insert(contactMessagesTable).values({
      name,
      email,
      subject,
      message,
    });

    console.log(`📩 Contact message saved: ${name} <${email}>`);

    // ✅ Send email (non-blocking)
    sendEmailNotification(name, email, subject, message);

    res.json({
      success: true,
      message: "Thank you for reaching out! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

export default router;