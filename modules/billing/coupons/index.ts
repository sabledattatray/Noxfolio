import { db } from '@/lib/db/drizzle';
import { coupons } from '@/lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';

export class CouponService {
  /**
   * Validate and get a coupon by code
   */
  static async validateCoupon(code: string) {
    const data = await db
      .select()
      .from(coupons)
      .where(eq(coupons.code, code))
      .limit(1);

    const coupon = data[0];

    if (!coupon) return null;

    // Check expiration
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return null;
    }

    // Check usage limits
    if (coupon.maxRedemptions && coupon.timesRedeemed >= coupon.maxRedemptions) {
      return null;
    }

    return coupon;
  }

  /**
   * Apply a coupon to an amount
   */
  static applyDiscount(amount: number, coupon: any): number {
    if (coupon.percentOff) {
      return Math.round(amount * (1 - coupon.percentOff / 100));
    }
    if (coupon.amountOff) {
      return Math.max(0, amount - coupon.amountOff);
    }
    return amount;
  }
}
