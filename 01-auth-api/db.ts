import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT as string),
});

const createUserSchema = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                CREATE SCHEMA IF NOT EXISTS user_schema;
	                CREATE TABLE IF NOT EXISTS user_schema.users (
	                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	                  email VARCHAR(255) NOT NULL,
	                  password VARCHAR(255) NOT NULL,
	                  refresh_token VARCHAR(255)
	                );
            `);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.log(error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
  }
};

export { pool, createUserSchema };
