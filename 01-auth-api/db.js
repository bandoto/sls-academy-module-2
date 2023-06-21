var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
});
const createUserSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN");
            yield client.query(`
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                CREATE SCHEMA IF NOT EXISTS user_schema;
	                CREATE TABLE IF NOT EXISTS user_schema.users (
	                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	                  email VARCHAR(255) NOT NULL,
	                  password VARCHAR(255) NOT NULL,
	                  refresh_token VARCHAR(255)
	                );
            `);
            yield client.query("COMMIT");
        }
        catch (error) {
            yield client.query("ROLLBACK");
            console.log(error);
        }
        finally {
            client.release();
        }
    }
    catch (error) {
        console.log(error);
    }
});
export { pool, createUserSchema };
