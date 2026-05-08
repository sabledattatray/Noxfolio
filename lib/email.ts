import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Noxfolio <noreply@noxfolio.com>',
      to: [email],
      subject: 'Verify your Noxfolio account',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; padding: 40px 20px; text-align: center;">
          <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            <div style="width: 64px; height: 64px; background-color: #000000; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h1 style="font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 8px; letter-spacing: -0.025em;">Verify your email</h1>
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px; line-height: 1.5;">Welcome to Noxfolio! Use the verification code below to complete your sign-up.</p>
            <div style="background-color: #f3f4f6; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 0.25em; color: #111827;">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #9ca3af; margin-bottom: 0;">This code will expire in 10 minutes.</p>
            <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #f3f4f6;">
              <p style="font-size: 12px; color: #9ca3af;">If you didn't request this code, you can safely ignore this email.</p>
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">&copy; 2024 Noxfolio Foundation. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return { error };
  }
}
