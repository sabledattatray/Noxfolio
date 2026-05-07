import { client } from './drizzle';

async function listTables() {
  const tables = await client`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
  console.log(tables);
  process.exit(0);
}

listTables();
