export class SlackIntegrationService {
  /**
   * Send a notification to a Slack channel
   */
  static async sendNotification(webhookUrl: string, message: string, color: string = '#000000') {
    const payload = {
      attachments: [
        {
          fallback: message,
          color: color,
          title: 'BillForge Notification',
          text: message,
          footer: 'BillForge Integration',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return response.ok;
  }

  /**
   * Post a billing alert to Slack
   */
  static async postBillingAlert(webhookUrl: string, event: string, amount: number) {
    const message = `*${event.toUpperCase()}*\nAmount: $${(amount / 100).toFixed(2)}\nA new billing event has occurred on your account.`;
    return this.sendNotification(webhookUrl, message, '#4F46E5');
  }
}
