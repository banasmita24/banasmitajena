import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db, contactMessagesTable } from "@workspace/db";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(
  name,
  email,
  subject,
  message
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email.");
    return;
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // works instantly
      to: process.env.GMAIL_USER,
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Message</h2>
          
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <hr/>
          
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    console.log(`✅ Email sent via Resend from: ${name}`);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
}

router.post("/contact", async (req, res) => {
  try {
    const parseResult = SubmitContactBody.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid input",
      });
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
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

export default router;