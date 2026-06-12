import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// Create a connection pool for the Neon PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the Drizzle ORM instance with schema
export const db = drizzle(pool, { schema });

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
