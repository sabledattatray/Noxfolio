import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

async function repair() {
  if (!connectionString) {
    console.error('❌ POSTGRES_URL or DATABASE_URL is not set.');
    process.exit(1);
  }

  console.log('🚀 Running Complete Schema Repair...');
  const sql = postgres(connectionString as string, { max: 1 });

  try {
    // 1. Add missing 'image' column to 'users'
    await sql.unsafe('ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS image text;');
    
    // 2. Ensure 'organizations' table has all columns
    await sql.unsafe('ALTER TABLE IF EXISTS teams RENAME TO organizations;');
    await sql.unsafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS razorpay_customer_id text UNIQUE;');
    await sql.unsafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS razorpay_subscription_id text UNIQUE;');
    await sql.unsafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS installed_apps jsonb DEFAULT \'[]\'::jsonb;');
    await sql.unsafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS custom_domain varchar(255) UNIQUE;');
    await sql.unsafe('ALTER TABLE IF EXISTS organizations ADD COLUMN IF NOT EXISTS balance integer DEFAULT 0;');
    
    // 3. Rename columns in related tables if needed
    await sql.unsafe('ALTER TABLE IF EXISTS activity_logs RENAME COLUMN team_id TO organization_id;');
    await sql.unsafe('ALTER TABLE IF EXISTS invitations RENAME COLUMN team_id TO organization_id;');
    await sql.unsafe('ALTER TABLE IF EXISTS organization_members RENAME COLUMN team_id TO organization_id;');

    // 4. Create missing tables from the schema
    await sql.unsafe('CREATE TABLE IF NOT EXISTS organizations (id serial PRIMARY KEY, name varchar(100) NOT NULL, created_at timestamp DEFAULT now() NOT NULL, updated_at timestamp DEFAULT now() NOT NULL, stripe_customer_id text UNIQUE, stripe_subscription_id text UNIQUE, stripe_product_id text, razorpay_customer_id text UNIQUE, razorpay_subscription_id text UNIQUE, plan_name varchar(50), subscription_status varchar(20), branding jsonb DEFAULT \'{"logo": null, "primaryColor": "#000000", "accentColor": "#f4f4f5", "font": "Inter", "darkMode": true}\'::jsonb, installed_apps jsonb DEFAULT \'[]\'::jsonb, custom_domain varchar(255) UNIQUE, balance integer DEFAULT 0);');
    await sql.unsafe('CREATE TABLE IF NOT EXISTS organization_members (id serial PRIMARY KEY, user_id integer NOT NULL REFERENCES users(id), organization_id integer NOT NULL REFERENCES organizations(id), role varchar(50) NOT NULL, joined_at timestamp DEFAULT now() NOT NULL);');
    await sql.unsafe('CREATE TABLE IF NOT EXISTS notifications (id serial PRIMARY KEY, user_id integer NOT NULL REFERENCES users(id), title varchar(255) NOT NULL, message text NOT NULL, type varchar(50) NOT NULL, is_read integer DEFAULT 0 NOT NULL, created_at timestamp DEFAULT now() NOT NULL);');
    await sql.unsafe('CREATE TABLE IF NOT EXISTS invoices (id serial PRIMARY KEY, organization_id integer NOT NULL REFERENCES organizations(id), stripe_invoice_id varchar(255) UNIQUE, razorpay_order_id varchar(255) UNIQUE, razorpay_payment_id varchar(255) UNIQUE, number varchar(50), amount integer NOT NULL, currency varchar(10) DEFAULT \'usd\' NOT NULL, status varchar(50) NOT NULL, pdf_url text, hosted_invoice_url text, created_at timestamp DEFAULT now() NOT NULL);');

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
