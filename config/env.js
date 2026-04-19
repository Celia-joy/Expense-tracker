import { config } from 'dotenv';

const result = config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});


export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN} = process.env;