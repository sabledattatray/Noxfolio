import Razorpay from 'razorpay';
import crypto from 'crypto';

export interface RazorpayOrderOptions {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export class RazorpayClient {
  private instance: Razorpay;

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';

    this.instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async createOrder(options: RazorpayOrderOptions) {
    console.log('🚀 Creating real Razorpay Order:', options);
    try {
      const order = await this.instance.orders.create({
        amount: options.amount, // amount in smallest currency unit (paise for INR)
        currency: options.currency,
        receipt: options.receipt,
        notes: options.notes,
      });
      return order;
    } catch (error) {
      console.error('❌ Razorpay Order Creation Failed:', error);
      throw error;
    }
  }

  async verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, signature: string) {
    const text = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    return expectedSignature === signature;
  }

  async fetchPayment(paymentId: string) {
    return await this.instance.payments.fetch(paymentId);
  }
}

export const razorpay = new RazorpayClient();
