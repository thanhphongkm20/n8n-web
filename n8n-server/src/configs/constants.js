import { config as dotenvConfig } from "dotenv";

// Default to 'development' when NODE_ENV is not set so .env.development loads during local dev
const env = process.env.NODE_ENV || "development";
dotenvConfig({ path: `.env.${env}` });

export const CONSTANTS = {
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  USER_ROLE: ["admin", "user"],
  /* DATABASE */
  // Accept either MONGO_URI (preferred) or MONGODB_URI (common in some setups)
  MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI,
  /* COMMON */
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  SESSION_NAME: process.env.SESSION_NAME || "session",
  SESSION_MAX_AGE: process.env.SESSION_MAX_AGE || 30 * 60 * 1000,
  /* JWT */
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_SIGNIN: "30d",
  JWT_EXPIRES_RESET_PASS: "1d",
  /* CORS */
  ALLOWED_ORIGINS: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://18.183.191.68"
  ],
};
