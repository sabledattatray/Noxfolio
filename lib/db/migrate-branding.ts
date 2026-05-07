import { client } from './drizzle';

async function migrate() {
  console.log('🚀 Running branding migration...');
  try {
    await client`
      ALTER TABLE "organizations" ADD COLUMN IF NOT EXISTS "branding" jsonb DEFAULT '{"logo": null, "primaryColor": "#0f172a", "accentColor": "#3b82f6", "font": "Inter", "darkMode": true}'::jsonb;
    `;
    console.log('✅ Branding column added.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
