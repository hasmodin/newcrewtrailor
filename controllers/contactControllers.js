import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  let { name, email, service, message } = req.body;

  try {
    // Run both email sends concurrently for faster execution
    await Promise.all([
      // 1. Notification email sent to your team inbox
      resend.emails.send({
        from: "New Crew Tailor <newcrewtailor.com@newcrewtailor.com>",
        to: "newcrewtailor.com@newcrewtailor.com",
        reply_to: email,
        subject: `New Inquiry : ${service} from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #c0392b; padding: 20px;">
              <h2 style="color: #c0392b;">New Crew Tailor Inquiry</h2>
              <p><strong>Customer Name:</strong> ${name}</p>
              <p><strong>Customer Email:</strong> ${email}</p>
              <p><strong>Interested In:</strong> ${service}</p>
              <hr>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
          </div>
        `,
      }),

      // 2. Auto-responder email sent directly to the customer
      resend.emails.send({
        from: "New Crew Tailor <newcrewtailor.com@newcrewtailor.com>",
        to: email, // Sent to customer's email address
        subject: `We received your inquiry regarding ${service}`,
        html: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
              <h2>Hi ${name},</h2>
              <p>Thank you for reaching out to <strong>New Crew Tailor</strong>!</p>
              <p>We have received your request regarding <strong>${service}</strong> and will get back to you shortly.</p>
              <hr style="border: none; border-top: 1px solid #eee;">
              <p><strong>Summary of your message:</strong></p>
              <blockquote style="color: #555; background: #f9f9f9; padding: 10px;">${message}</blockquote>
              <p>Best regards,<br>The New Crew Tailor Team</p>
          </div>
        `,
      }),
    ]);

    res.render("pages/contact-success", { name });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .send("<h1>Oops! Something went wrong. Please call us at 55066593.</h1>");
  }
};
