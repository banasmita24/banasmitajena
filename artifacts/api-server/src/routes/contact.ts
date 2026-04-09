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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // required for 465
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP ERROR:", error);
    } else {
      console.log("SMTP server is ready");
    }
  });

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

  console.log(`Contact email sent from: ${name} <${email}> — Subject: ${subject}`);
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

    await db.insert(contactMessagesTable).values({ name, email, subject, message });
    console.log(`Contact message saved: ${name} <${email}>`);

    sendEmailNotification(name, email, subject, message).catch((err) => {
      console.error("Email send failed (non-fatal):", err.message);
    });

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
