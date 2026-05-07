import { client } from './drizzle';

async function migrate() {
  console.log('🚀 Adding image column to users...');
  try {
    await client`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "image" text`;
    console.log('✅ Image column added.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
