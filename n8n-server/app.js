import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import expressSession from "express-session";
// import cookieSession from "cookie-session";

import { CONSTANTS } from "./src/configs/constants.js";
import router from "./src/routes/index.js";
import { logger } from "./src/configs/logger.js";
import { ApiResponse } from "./src/configs/response.js";

// Initialize Express app
const app = express();

// Trust proxy for production deployments
if (CONSTANTS.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (CONSTANTS.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// Body parsing middleware with size limits
app.use(bodyParser.json({
  limit: CONSTANTS.MAX_REQUEST_SIZE || "10mb",
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: CONSTANTS.MAX_REQUEST_SIZE || "10mb",
}));

// Cookie and session middleware
app.use(cookieParser(CONSTANTS.COOKIE_SECRET));
app.use(expressSession({
  name: CONSTANTS.SESSION_NAME,
  secret: CONSTANTS.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: CONSTANTS.NODE_ENV === "production",
    httpOnly: true,
    sameSite: CONSTANTS.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: CONSTANTS.SESSION_MAX_AGE,
  },
}));

// Health check endpoint with more detailed information
app.get("/api/v1/health", (_req, res) => {
  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || "1.0.0",
    environment: CONSTANTS.NODE_ENV,
  };

  ApiResponse.OK(res, healthData);
});

// API routes
app.use("/api/v1", router);

// 404 handler
app.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  ApiResponse.NotFound(res, "The requested resource was not found on the server");
});

// Global error handling middleware
app.use((err, req, res, _next) => {
  // Log the error
  logger.error("Unhandled error:", {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value entered",
    });
  }

  // Default error response
  const message = CONSTANTS.NODE_ENV === "production" ? "Something went wrong!" : err.message;
  ApiResponse.InternalServerError(res, err, message);
});

export default app;
