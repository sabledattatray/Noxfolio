import { client } from './drizzle';

async function migrate() {
  console.log('🚀 Running Razorpay migration...');
  try {
    await client`ALTER TABLE "organizations" ADD COLUMN IF NOT EXISTS "razorpay_customer_id" text`;
    await client`ALTER TABLE "organizations" ADD COLUMN IF NOT EXISTS "razorpay_subscription_id" text`;
    await client`ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "razorpay_order_id" varchar(255)`;
    await client`ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "razorpay_payment_id" varchar(255)`;
    
    console.log('✅ Razorpay columns added.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
