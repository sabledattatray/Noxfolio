import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
console.log('🔍 Environment Check:');
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Working Dir:', process.cwd());
process.exit(0);
