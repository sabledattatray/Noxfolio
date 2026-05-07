import crypto from 'node:crypto';

export class WebhookService {
  /**
   * Generate a secure webhook signature
   */
  static generateSignature(payload: string, secret: string): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.${payload}`)
      .digest('hex');

    return `t=${timestamp},v1=${signature}`;
  }

  /**
   * Verify an incoming webhook signature
   */
  static verifySignature(payload: string, header: string, secret: string): boolean {
    const parts = header.split(',');
    const tPart = parts.find(p => p.startsWith('t='));
    const vPart = parts.find(p => p.startsWith('v1='));

    if (!tPart || !vPart) return false;

    const timestamp = tPart.split('=')[1];
    const signature = vPart.split('=')[1];

    // Check for replay attacks (5 minute window)
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - parseInt(timestamp)) > 300) return false;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.${payload}`)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}
