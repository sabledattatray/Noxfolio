import postgres from 'postgres';

async function listDBs() {
  console.log('🔍 Listing databases...');
  try {
    const sql = postgres('postgresql://postgres:Datta@123@localhost:5432/postgres');
    const result = await sql`SELECT datname FROM pg_database WHERE datistemplate = false`;
    console.log('✅ DATABASES:', result.map(r => r.datname));
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

listDBs();
