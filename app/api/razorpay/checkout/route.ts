import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay/client';
import { getOrganizationForUser } from '@/lib/db/queries';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', planId } = await req.json();
    const organization = await getOrganizationForUser();

    if (!organization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await razorpay.createOrder({
      amount: amount, // amount should be in paise
      currency: currency,
      receipt: `receipt_org_${organization.id}_${Date.now()}`,
      notes: {
        organizationId: organization.id.toString(),
        planId: planId,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
