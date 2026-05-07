import { client } from './drizzle';

async function migrate() {
  console.log('🚀 Starting manual migration...');

  try {
    // 1. Create Users
    await client`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(100),
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" text NOT NULL,
        "role" varchar(20) DEFAULT 'member' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `;
    console.log('✅ Users table created.');

    // 2. Create Organizations
    await client`
      CREATE TABLE IF NOT EXISTS "organizations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(100) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "stripe_customer_id" text UNIQUE,
        "stripe_subscription_id" text UNIQUE,
        "stripe_product_id" text,
        "plan_name" varchar(50),
        "subscription_status" varchar(20)
      );
    `;
    console.log('✅ Organizations table created.');

    // 3. Create Organization Members
    await client`
      CREATE TABLE IF NOT EXISTS "organization_members" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL REFERENCES users(id),
        "organization_id" integer NOT NULL REFERENCES organizations(id),
        "role" varchar(50) NOT NULL,
        "joined_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log('✅ Organization Members table created.');

    // 4. Create Activity Logs
    await client`
      CREATE TABLE IF NOT EXISTS "activity_logs" (
        "id" serial PRIMARY KEY NOT NULL,
        "organization_id" integer NOT NULL REFERENCES organizations(id),
        "user_id" integer REFERENCES users(id),
        "action" text NOT NULL,
        "timestamp" timestamp DEFAULT now() NOT NULL,
        "ip_address" varchar(45)
      );
    `;
    console.log('✅ Activity Logs table created.');

    // 5. Create Invitations
    await client`
      CREATE TABLE IF NOT EXISTS "invitations" (
        "id" serial PRIMARY KEY NOT NULL,
        "organization_id" integer NOT NULL REFERENCES organizations(id),
        "email" varchar(255) NOT NULL,
        "role" varchar(50) NOT NULL,
        "invited_by" integer NOT NULL REFERENCES users(id),
        "invited_at" timestamp DEFAULT now() NOT NULL,
        "status" varchar(20) DEFAULT 'pending' NOT NULL
      );
    `;
    console.log('✅ Invitations table created.');

    console.log('🎉 Manual migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
