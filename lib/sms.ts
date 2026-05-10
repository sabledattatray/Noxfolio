import 'dotenv/config';

interface SendSMSParams {
  to: string;
  body: string;
}

/**
 * Enterprise-grade SMS Service
 * Supports Twilio with a graceful fallback to terminal logging for local development.
 */
export async function sendSMS({ to, body }: SendSMSParams) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  // Development/Trial Fallback
  if (!accountSid || !authToken || !fromNumber) {
    console.log('\n-----------------------------------');
    console.log('🧪 SMS SERVICE: DEVELOPMENT MODE');
    console.log(`To:   ${to}`);
    console.log(`Msg:  ${body}`);
    console.log('-----------------------------------');
    console.log(
      '💡 TIP: Add TWILIO_ACCOUNT_SID, AUTH_TOKEN, and PHONE_NUMBER to .env for real SMS.\n',
    );

    return {
      success: true,
      mode: 'development',
      message: 'Logged to terminal (Dev Mode)',
    };
  }

  try {
    // Dynamically import Twilio to avoid bundle issues if not used
    const twilio = (await import('twilio')).default;
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      body,
      from: fromNumber,
      to,
    });

    console.log(`✅ SMS sent successfully: ${message.sid}`);
    return { success: true, messageId: message.sid };
  } catch (error: any) {
    console.error('❌ SMS sending failed:', error);
    return { success: false, error: error.message };
  }
}
