import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db/drizzle';
import { invoices, organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('x-razorpay-signature');

  // Verify webhook signature if secret is provided
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (webhookSecret && signature) {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  }

  const event = JSON.parse(payload);
  console.log('🔔 Razorpay Webhook Received:', event.event);

  try {
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
      // Handle other events as needed
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handlePaymentCaptured(payment: any) {
  console.log('✅ Razorpay Payment Captured:', payment.id);

  // Find invoice by order ID
  const [existingInvoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.razorpayOrderId, payment.order_id))
    .limit(1);

  if (existingInvoice) {
    await db
      .update(invoices)
      .set({
        status: 'paid',
        razorpayPaymentId: payment.id,
      })
      .where(eq(invoices.id, existingInvoice.id));

    // Log financial activity
    await db.insert(activityLogs).values({
      organizationId: existingInvoice.organizationId,
      action: `Payment captured for invoice ${existingInvoice.number}: ${payment.amount / 100} ${payment.currency}`,
    });
  }
}

async function handleOrderPaid(order: any) {
  console.log('✅ Razorpay Order Paid:', order.id);
  const organizationId = parseInt(order.notes.organizationId);

  if (isNaN(organizationId)) return;

  await db.insert(invoices).values({
    organizationId,
    razorpayOrderId: order.id,
    amount: order.amount_paid,
    currency: order.currency,
    status: 'paid',
    number: `INV-RZP-${order.id.substring(6)}`,
  });

  // Update organization subscription status
  await db
    .update(organizations)
    .set({
      subscriptionStatus: 'active',
      planName: order.notes.planId || 'pro',
    })
    .where(eq(organizations.id, organizationId));
}
