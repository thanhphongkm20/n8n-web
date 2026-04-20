import chalk from "chalk";
import { createServer } from "http";

import app from "./app.js";
import { CONSTANTS } from "./src/configs/constants.js";
import { logger } from "./src/configs/logger.js";
import mongoConnectionManager from "./src/configs/mongodb.js";
import userController from "./src/controllers/user.controller.js";
// import { startPublishScheduledJob } from "./src/jobs/publish-scheduled.job.js";

// Configuration
const config = {
  port: CONSTANTS.PORT,
  mongoConfig: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 5,
    maxIdleTimeMS: 30000,
    bufferCommands: false,
  },
};

// Initialize server
app.set("port", config.port);
const server = createServer(app);

// Set server timeout
server.timeout = 30000; // 30 seconds

class ServerManager {
  static handleError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof config.port === "string" ? `Pipe ${config.port}` : `Port ${config.port}`;

    const errorMessages = {
      EACCES: `${bind} requires elevated privileges`,
      EADDRINUSE: `${bind} is already in use`,
      ENOTFOUND: "Server not found",
      ECONNREFUSED: "Connection refused",
    };

    const errorMessage = errorMessages[error.code] || `Unknown server error: ${error.message}`;

    logger.error("Server error:", { error: errorMessage, code: error.code });
    console.error(chalk.red("✗ [Server] Error:", errorMessage));

    process.exit(1);
  }

  static handleListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

    logger.info(`Server listening on ${bind}`);
    console.log(chalk.green(`✓ [Server] Listening on ${bind}`));
    console.log(chalk.cyan("🚀 Application started successfully!"));
    console.log(chalk.gray(`📝 Environment: ${CONSTANTS.NODE_ENV}`));
    console.log(chalk.gray(`📅 Started at: ${new Date().toISOString()}`));
  }

  static start() {
    return new Promise((resolve, reject) => {
      server
        .listen(config.port)
        .on("error", (error) => {
          ServerManager.handleError(error);
          reject(error);
        })
        .on("listening", () => {
          ServerManager.handleListening();
          resolve();
        });
    });
  }

  static stop() {
    return new Promise((resolve) => {
      logger.info("Shutting down server...");
      console.log(chalk.yellow("⏳ [Server] Shutting down..."));

      server.close((err) => {
        if (err) {
          logger.error("Error during server shutdown:", err);
          console.error(chalk.red("✗ [Server] Error during shutdown:", err.message));
        } else {
          logger.info("Server closed successfully");
          console.log(chalk.green("✓ [Server] Closed successfully"));
        }
        resolve();
      });
    });
  }
}

// Application lifecycle management
class Application {
  static async start() {
    try {
      console.log(chalk.blue("🔥 Starting application..."));

      // Connect to MongoDB
      await mongoConnectionManager.connect();

      // Initialize admin user
      await userController.initAdminUser();

      // Start scheduled jobs
      // startPublishScheduledJob();

      // Start server
      await ServerManager.start();

    } catch (error) {
      logger.error("Application startup failed:", error);
      console.error(chalk.red("✗ [Application] Startup failed:", error.message));
      await Application.shutdown(1);
    }
  }

  static async shutdown(exitCode = 0) {
    try {
      console.log(chalk.yellow("🛑 Initiating graceful shutdown..."));

      // Stop accepting new connections
      await ServerManager.stop();

      // Close database connection
      await mongoConnectionManager.disconnect();

      logger.info("Application shutdown complete");
      console.log(chalk.green("✓ [Application] Shutdown complete"));

      process.exit(exitCode);
    } catch (error) {
      logger.error("Error during shutdown:", error);
      console.error(chalk.red("✗ [Application] Error during shutdown:", error.message));
      process.exit(1);
    }
  }
}

// Handle process events
const handleShutdown = (signal) => {
  logger.info(`Received ${signal}, starting graceful shutdown`);
  console.log(chalk.yellow(`📡 [Process] Received ${signal}`));
  Application.shutdown();
};

// Graceful shutdown handlers
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  console.error(chalk.red("💥 [Process] Uncaught Exception:", error.message));
  Application.shutdown(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.error(chalk.red("💥 [Process] Unhandled Rejection:", reason));
  Application.shutdown(1);
});

// Start the application
Application.start();
