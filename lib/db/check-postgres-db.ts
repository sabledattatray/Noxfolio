import postgres from 'postgres';

async function checkPostgresDB() {
  console.log('🔍 Checking the "postgres" (default) database...');
  try {
    const sql = postgres('postgresql://postgres:Datta@123@localhost:5432/postgres');
    const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('✅ Tables in "postgres" DB:', result.map(r => r.table_name));
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

checkPostgresDB();
