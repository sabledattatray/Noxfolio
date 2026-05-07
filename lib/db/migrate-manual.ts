import { db } from './drizzle';
import { users, organizations, organizationMembers, activityLogs, invitations, teamMembers } from './schema';
import { sql } from 'drizzle-orm';

async function migrate() {
  console.log('🚀 Starting manual schema migration...');
  
  try {
    // Check if tables exist, if not create them
    // This is a simplified migration for the 'users' relation error
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(100),
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" text,
        "role" varchar(20) DEFAULT 'member' NOT NULL,
        "image" text,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "organizations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(100) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "stripe_customer_id" text UNIQUE,
        "stripe_subscription_id" text UNIQUE,
        "stripe_product_id" text,
        "plan_name" varchar(50),
        "subscription_status" varchar(20),
        "branding" jsonb DEFAULT '{"logo": null, "primaryColor": "#000000", "accentColor": "#f4f4f5", "font": "Inter", "darkMode": true}'::jsonb
      );
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "organization_members" (
        "id" serial PRIMARY KEY NOT NULL,
        "organization_id" integer NOT NULL REFERENCES "organizations"("id"),
        "user_id" integer NOT NULL REFERENCES "users"("id"),
        "role" varchar(50) NOT NULL,
        "joined_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    console.log('✅ Schema migration completed successfully.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
