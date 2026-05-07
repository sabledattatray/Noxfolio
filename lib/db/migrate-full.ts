import { client } from './drizzle';

async function migrate() {
  console.log('🚀 Running Comprehensive Manual Migration...');

  try {
    // 1. Core Tables (Ensure they exist)
    await client`CREATE TABLE IF NOT EXISTS "users" ("id" serial PRIMARY KEY NOT NULL, "name" varchar(100), "email" varchar(255) NOT NULL UNIQUE, "password_hash" text NOT NULL, "role" varchar(20) DEFAULT 'member' NOT NULL, "created_at" timestamp DEFAULT now() NOT NULL, "updated_at" timestamp DEFAULT now() NOT NULL, "deleted_at" timestamp)`;
    await client`CREATE TABLE IF NOT EXISTS "organizations" ("id" serial PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "created_at" timestamp DEFAULT now() NOT NULL, "updated_at" timestamp DEFAULT now() NOT NULL, "stripe_customer_id" text UNIQUE, "stripe_subscription_id" text UNIQUE, "stripe_product_id" text, "plan_name" varchar(50), "subscription_status" varchar(20), "branding" jsonb DEFAULT '{"logo": null, "primaryColor": "#0f172a", "accentColor": "#3b82f6", "font": "Inter", "darkMode": true}'::jsonb, "razorpay_customer_id" text UNIQUE, "razorpay_subscription_id" text UNIQUE)`;
    await client`CREATE TABLE IF NOT EXISTS "organization_members" ("id" serial PRIMARY KEY NOT NULL, "user_id" integer NOT NULL REFERENCES users(id), "organization_id" integer NOT NULL REFERENCES organizations(id), "role" varchar(50) NOT NULL, "joined_at" timestamp DEFAULT now() NOT NULL)`;
    
    // 2. Billing & Invoices
    await client`CREATE TABLE IF NOT EXISTS "invoices" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "stripe_invoice_id" varchar(255) UNIQUE, "razorpay_order_id" varchar(255) UNIQUE, "razorpay_payment_id" varchar(255) UNIQUE, "number" varchar(50), "amount" integer NOT NULL, "currency" varchar(10) DEFAULT 'usd' NOT NULL, "status" varchar(50) NOT NULL, "pdf_url" text, "hosted_invoice_url" text, "created_at" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "invoice_items" ("id" serial PRIMARY KEY NOT NULL, "invoice_id" integer NOT NULL REFERENCES invoices(id), "description" text NOT NULL, "amount" integer NOT NULL, "currency" varchar(10) DEFAULT 'usd' NOT NULL, "quantity" integer DEFAULT 1 NOT NULL)`;
    
    // 3. Features & Analytics
    await client`CREATE TABLE IF NOT EXISTS "coupons" ("id" serial PRIMARY KEY NOT NULL, "code" varchar(50) NOT NULL UNIQUE, "description" text, "amount_off" integer, "percent_off" integer, "duration" varchar(20) NOT NULL, "duration_in_months" integer, "max_redemptions" integer, "times_redeemed" integer DEFAULT 0 NOT NULL, "expires_at" timestamp, "created_at" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "usage_events" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "type" varchar(50) NOT NULL, "value" integer DEFAULT 1 NOT NULL, "metadata" jsonb, "timestamp" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "analytics_snapshots" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "type" varchar(50) NOT NULL, "data" jsonb NOT NULL, "snapshot_date" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "kpi_metrics" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "name" varchar(50) NOT NULL, "value" integer NOT NULL, "period" varchar(20) NOT NULL, "calculated_at" timestamp DEFAULT now() NOT NULL)`;
    
    // 4. Infrastructure & Security
    await client`CREATE TABLE IF NOT EXISTS "activity_logs" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "user_id" integer REFERENCES users(id), "action" text NOT NULL, "timestamp" timestamp DEFAULT now() NOT NULL, "ip_address" varchar(45))`;
    await client`CREATE TABLE IF NOT EXISTS "api_keys" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "key" varchar(255) NOT NULL UNIQUE, "name" varchar(100) NOT NULL, "prefix" varchar(20) NOT NULL, "scopes" jsonb NOT NULL, "environment" varchar(20) DEFAULT 'live' NOT NULL, "expires_at" timestamp, "last_used_at" timestamp, "created_at" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "webhook_endpoints" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "url" text NOT NULL, "secret" varchar(255) NOT NULL, "events" jsonb NOT NULL, "status" varchar(20) DEFAULT 'active' NOT NULL, "created_at" timestamp DEFAULT now() NOT NULL)`;
    await client`CREATE TABLE IF NOT EXISTS "audit_logs" ("id" serial PRIMARY KEY NOT NULL, "organization_id" integer NOT NULL REFERENCES organizations(id), "user_id" integer REFERENCES users(id), "action" varchar(255) NOT NULL, "entity_type" varchar(50) NOT NULL, "entity_id" varchar(255) NOT NULL, "metadata" jsonb, "ip_address" varchar(45), "user_agent" text, "timestamp" timestamp DEFAULT now() NOT NULL)`;
    
    console.log('🎉 All tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
