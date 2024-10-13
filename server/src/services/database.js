import pg from "pg";

export const dbPool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
