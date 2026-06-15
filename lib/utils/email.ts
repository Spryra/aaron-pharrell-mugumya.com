import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress?: string;
  submittedAt: Date;
}

export async function sendContactNotificationEmail(data: ContactEmailData) {
  const { name, email, subject, message, ipAddress, submittedAt } = data;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>

      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
        <p style="margin: 8px 0;"><strong>Submitted:</strong> ${submittedAt.toLocaleString()}</p>
        ${ipAddress ? `<p style="margin: 8px 0; font-size: 12px; color: #666;"><strong>IP Address:</strong> ${ipAddress}</p>` : ''}
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Message:</h3>
        <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 14px;">
          <strong>Quick Reply:</strong> <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}">Reply to ${name}</a>
        </p>
      </div>

      <div style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p>This is an automated notification from your contact form. Do not reply to this email.</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: process.env.ADMIN_EMAIL_RECIPIENT!,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw new Error('Failed to send email notification');
  }
}
