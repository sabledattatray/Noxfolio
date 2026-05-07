import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import path from 'path';
import 'dotenv/config';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

async function repair() {
  if (!connectionString) {
    console.error('❌ POSTGRES_URL or DATABASE_URL is not set.');
    process.exit(1);
  }

  console.log('🚀 Running Error-Proof Schema Repair...');
  const sql = postgres(connectionString as string, { max: 1 });

  const runSafe = async (cmd: string) => {
    try {
      await sql.unsafe(cmd);
      console.log('  ✅ SUCCESS:', cmd.substring(0, 50) + '...');
    } catch (e: any) {
      console.log('  ⚠️ SKIPPED (Already fixed or invalid):', e.message);
    }
  };

  try {
    // 1. Core Table Setup
    await runSafe('ALTER TABLE IF EXISTS teams RENAME TO organizations;');
    await runSafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS image text;');
    await runSafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS deleted_at timestamp;');
    await runSafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS email_verified_at timestamp;');
    await runSafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS otp varchar(6);');
    await runSafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS otp_expires_at timestamp;');
    
    // 2. Organization Column Setup
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS razorpay_customer_id text;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS razorpay_subscription_id text;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS stripe_customer_id text;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS stripe_subscription_id text;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS stripe_product_id text;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS plan_name varchar(50);');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS subscription_status varchar(20);');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS branding jsonb DEFAULT \'{"logo": null, "primaryColor": "#000000", "accentColor": "#f4f4f5", "font": "Inter", "darkMode": true}\'::jsonb;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS installed_apps jsonb DEFAULT \'[]\'::jsonb;');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS custom_domain varchar(255);');
    await runSafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS balance integer DEFAULT 0;');
    
    // 3. Relational Column Setup (Error-proof renaming)
    await runSafe('ALTER TABLE IF EXISTS activity_logs RENAME COLUMN team_id TO organization_id;');
    await runSafe('ALTER TABLE IF EXISTS invitations RENAME COLUMN team_id TO organization_id;');
    await runSafe('ALTER TABLE IF EXISTS organization_members RENAME COLUMN team_id TO organization_id;');

    // 4. Create all other missing tables from schema
    await runSafe(`
      CREATE TABLE IF NOT EXISTS organizations (
        id serial PRIMARY KEY,
        name varchar(100) NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        stripe_customer_id text UNIQUE,
        stripe_subscription_id text UNIQUE,
        stripe_product_id text,
        razorpay_customer_id text UNIQUE,
        razorpay_subscription_id text UNIQUE,
        plan_name varchar(50),
        subscription_status varchar(20),
        branding jsonb DEFAULT '{"logo": null, "primaryColor": "#000000", "accentColor": "#f4f4f5", "font": "Inter", "darkMode": true}'::jsonb,
        installed_apps jsonb DEFAULT '[]'::jsonb,
        custom_domain varchar(255) UNIQUE,
        balance integer DEFAULT 0
      );
    `);
    await runSafe('CREATE TABLE IF NOT EXISTS organization_members (id serial PRIMARY KEY, user_id integer NOT NULL, organization_id integer NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS notifications (id serial PRIMARY KEY, user_id integer NOT NULL, title varchar(255) NOT NULL, message text NOT NULL, type varchar(50) NOT NULL, is_read integer DEFAULT 0 NOT NULL, created_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS invoices (id serial PRIMARY KEY, organization_id integer NOT NULL, stripe_invoice_id varchar(255) UNIQUE, razorpay_order_id varchar(255) UNIQUE, razorpay_payment_id varchar(255) UNIQUE, number varchar(50), amount integer NOT NULL, currency varchar(10) DEFAULT \'usd\' NOT NULL, status varchar(50) NOT NULL, pdf_url text, hosted_invoice_url text, created_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS invoice_items (id serial PRIMARY KEY, invoice_id integer NOT NULL, description text NOT NULL, amount integer NOT NULL, currency varchar(10) DEFAULT \'usd\' NOT NULL, quantity integer DEFAULT 1 NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS coupons (id serial PRIMARY KEY, code varchar(50) NOT NULL UNIQUE, amount_off integer, percent_off integer, duration varchar(20) NOT NULL, created_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS usage_events (id serial PRIMARY KEY, organization_id integer NOT NULL, type varchar(50) NOT NULL, value integer DEFAULT 1 NOT NULL, timestamp timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS analytics_snapshots (id serial PRIMARY KEY, organization_id integer NOT NULL, type varchar(50) NOT NULL, data jsonb NOT NULL, snapshot_date timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS kpi_metrics (id serial PRIMARY KEY, organization_id integer NOT NULL, name varchar(50) NOT NULL, value integer NOT NULL, period varchar(20) NOT NULL, calculated_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS api_keys (id serial PRIMARY KEY, organization_id integer NOT NULL, key varchar(255) NOT NULL UNIQUE, name varchar(100) NOT NULL, prefix varchar(20) NOT NULL, scopes jsonb NOT NULL, created_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS webhook_endpoints (id serial PRIMARY KEY, organization_id integer NOT NULL, url text NOT NULL, secret varchar(255) NOT NULL, events jsonb NOT NULL, status varchar(20) DEFAULT \'active\' NOT NULL, created_at timestamp DEFAULT now() NOT NULL);');
    await runSafe('CREATE TABLE IF NOT EXISTS audit_logs (id serial PRIMARY KEY, organization_id integer NOT NULL, user_id integer, action varchar(255) NOT NULL, entity_type varchar(50) NOT NULL, entity_id varchar(255) NOT NULL, timestamp timestamp DEFAULT now() NOT NULL);');

    console.log('✅ Schema repair completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Repair failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

repair();
