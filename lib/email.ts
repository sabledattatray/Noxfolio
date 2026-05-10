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

export async function sendInvitationEmail(
  email: string,
  orgName: string,
  role: string,
  inviteId: number,
) {
  try {
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?inviteId=${inviteId}&email=${encodeURIComponent(email)}`;
    const { data, error } = await resend.emails.send({
      from: 'Noxfolio <noreply@noxfolio.com>',
      to: [email],
      subject: `You've been invited to join ${orgName} on Noxfolio`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; padding: 40px 20px; text-align: center;">
          <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            <div style="width: 64px; height: 64px; background-color: #000000; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <h1 style="font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 8px; letter-spacing: -0.025em;">Team Invitation</h1>
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px; line-height: 1.5;">You've been invited to join <strong>${orgName}</strong> as a <strong>${role}</strong>.</p>
            <a href="${inviteUrl}" style="display: inline-block; background-color: #000000; color: #ffffff; font-weight: 800; font-size: 16px; padding: 16px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">Accept Invitation</a>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 32px;">If the button above doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 10px; color: #3b82f6; word-break: break-all;">${inviteUrl}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">&copy; 2024 Noxfolio Foundation. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending invitation email:', error);
      return { error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending invitation email:', error);
    return { error };
  }
}
