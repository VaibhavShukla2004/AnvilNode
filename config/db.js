import { neon } from '@neondatabase/serverless';

async function setup() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set.');
  }

  const sql = neon(databaseUrl);
  await sql`SELECT 1`;
  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      publication_year INT,
      in_stock BOOLEAN DEFAULT TRUE
    );
  `;

  await sql`
    INSERT INTO books (title, author, publication_year, in_stock)
    SELECT 'The Hobbit', 'J.R.R. Tolkien', 1937, TRUE
    WHERE NOT EXISTS (
      SELECT 1 FROM books WHERE title = 'The Hobbit'
    );
  `;
  await sql`
    INSERT INTO books (title, author, publication_year, in_stock)
    SELECT '1984', 'George Orwell', 1949, TRUE
    WHERE NOT EXISTS (
      SELECT 1 FROM books WHERE title = '1984'
    );
  `;

  const [location] = await sql`
    SELECT current_database() AS database, current_schema() AS schema;
  `;
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = current_schema()
      AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;

  console.log(
    `Neon database connection established (${location.database}, schema: ${location.schema}).`
  );
  console.log(`Tables in schema: ${tables.map(({ table_name }) => table_name).join(', ')}`);
}

export default setup;