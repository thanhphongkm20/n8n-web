import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.development" });

export const CONSTANTS = {
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  USER_ROLE: ["admin", "user"],
  /* DATABASE */
  MONGO_URI: process.env.MONGO_URI,
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
