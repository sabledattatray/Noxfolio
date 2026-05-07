import { db } from './lib/db/drizzle';
import { organizations } from './lib/db/schema';
import { sql } from 'drizzle-orm';

async function resetBranding() {
  console.log('Resetting all organization branding to neutral defaults...');
  
  await db.update(organizations).set({
    branding: {
      logo: null,
      primaryColor: '#000000',
      accentColor: '#f4f4f5',
      font: 'Inter',
      darkMode: true
    }
  });

  console.log('Branding reset successfully.');
}

resetBranding()
  .catch((error) => {
    console.error('Reset failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
