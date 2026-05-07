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
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set');
    }

    this.instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
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
