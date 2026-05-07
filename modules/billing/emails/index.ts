export class BillingEmailService {
  /**
   * Send invoice email
   */
  static async sendInvoiceEmail(to: string, invoiceNumber: string, amount: number, pdfLink: string) {
    console.log(`[EMAIL] Sending invoice ${invoiceNumber} to ${to}. Amount: $${amount / 100}. Link: ${pdfLink}`);
    // Integration with Resend or SendGrid would go here
  }

  /**
   * Send payment failure alert
   */
  static async sendPaymentFailedEmail(to: string, amount: number, retryLink: string) {
    console.log(`[EMAIL] Payment failed alert sent to ${to}. Amount: $${amount / 100}. Retry: ${retryLink}`);
  }

  /**
   * Send trial expiration reminder
   */
  static async sendTrialEndingEmail(to: string, daysLeft: number) {
    console.log(`[EMAIL] Trial ending in ${daysLeft} days for ${to}.`);
  }
}
