import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export const query = (text: string, params: any[]) => pool.query(text, params);
