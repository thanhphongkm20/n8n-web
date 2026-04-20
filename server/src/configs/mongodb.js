import chalk from "chalk";
import mongoose from "mongoose";

import { CONSTANTS } from "../configs/constants.js";
import { logger } from "./logger.js";

class MongoDBConnectionManager {
  constructor() {
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = CONSTANTS.DB_MAX_RETRIES || 5;
    this.retryDelay = CONSTANTS.DB_RETRY_DELAY || 5000; // 5 seconds

    this.config = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      bufferCommands: false,
      retryWrites: true,
      retryReads: true,
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Connection successful
    mongoose.connection.on("connected", () => {
      this.isConnected = true;
      this.connectionAttempts = 0;
      logger.info("MongoDB connected successfully", {
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name,
        timestamp: "2025-06-22 03:49:56",
      });
      console.log(chalk.green("✓ [MongoDB] Connection established successfully"));
    });

    // Connection error
    mongoose.connection.on("error", (err) => {
      this.isConnected = false;
      logger.error("MongoDB connection error:", {
        error: err.message,
        stack: err.stack,
        attempt: this.connectionAttempts,
        timestamp: "2025-06-22 03:49:56",
      });
      console.error(chalk.red("✗ [MongoDB] Connection error:", err.message));

      // Attempt reconnection if not at max retries
      if (this.connectionAttempts < this.maxRetries) {
        this.scheduleReconnection();
      }
    });

    // Connection disconnected
    mongoose.connection.on("disconnected", () => {
      this.isConnected = false;
      logger.warn("MongoDB disconnected");
      console.log(chalk.yellow("⚠ [MongoDB] Connection lost"));
    });

    // Connection reconnected
    mongoose.connection.on("reconnected", () => {
      this.isConnected = true;
      this.connectionAttempts = 0;
      logger.info("MongoDB reconnected successfully");
      console.log(chalk.green("✓ [MongoDB] Reconnection successful"));
    });

    // Connection close
    mongoose.connection.on("close", () => {
      this.isConnected = false;
      logger.info("MongoDB connection closed");
      console.log(chalk.cyan("[MongoDB] Connection closed gracefully"));
    });

    // Index creation
    mongoose.connection.on("index", (err) => {
      if (err) {
        logger.error("MongoDB index error:", err);
      } else {
        logger.info("MongoDB index created successfully");
      }
    });
  }

  async connect(uri = CONSTANTS.MONGO_URI, options = {}) {
    try {
      if (this.isConnected) {
        logger.warn("MongoDB already connected");
        return;
      }

      if (!uri) {
        throw new Error("MongoDB URI is required");
      }

      this.connectionAttempts++;

      logger.info("Attempting to connect to MongoDB...", {
        attempt: this.connectionAttempts,
        maxRetries: this.maxRetries,
        timestamp: "2025-06-22 03:49:56",
      });

      console.log(chalk.blue(`🔄 [MongoDB] Connecting... (Attempt ${this.connectionAttempts}/${this.maxRetries})`));

      // Merge default config with provided options
      const connectionOptions = { ...this.config, ...options };

      // Set mongoose configuration
      mongoose.set("strictQuery", true);

      // Connect to MongoDB
      await mongoose.connect(uri, connectionOptions);

    } catch (error) {
      this.isConnected = false;
      logger.error("MongoDB connection failed:", {
        error: error.message,
        stack: error.stack,
        attempt: this.connectionAttempts,
        uri: uri?.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@"), // Hide credentials in logs
        timestamp: "2025-06-22 03:49:56",
      });

      console.error(chalk.red(`✗ [MongoDB] Connection failed (Attempt ${this.connectionAttempts}/${this.maxRetries}):`, error.message));

      if (this.connectionAttempts >= this.maxRetries) {
        console.error(chalk.red("✗ [MongoDB] Max connection attempts reached. Giving up."));
        throw new Error(`Failed to connect to MongoDB after ${this.maxRetries} attempts: ${error.message}`);
      }

      // Schedule reconnection
      this.scheduleReconnection();
      throw error;
    }
  }

  scheduleReconnection() {
    if (this.connectionAttempts < this.maxRetries) {
      const delay = this.retryDelay * this.connectionAttempts; // Exponential backoff

      logger.info(`Scheduling MongoDB reconnection attempt in ${delay}ms`, {
        nextAttempt: this.connectionAttempts + 1,
        maxRetries: this.maxRetries,
      });

      console.log(chalk.yellow(`⏳ [MongoDB] Retrying connection in ${delay / 1000} seconds...`));

      setTimeout(() => {
        if (!this.isConnected) {
          this.connect();
        }
      }, delay);
    }
  }

  async disconnect(force = false) {
    try {
      if (!this.isConnected && mongoose.connection.readyState === 0) {
        logger.info("MongoDB already disconnected");
        return;
      }

      logger.info("Disconnecting from MongoDB...", {
        force,
        timestamp: "2025-06-22 03:49:56",
      });
      console.log(chalk.yellow("🔄 [MongoDB] Disconnecting..."));

      await mongoose.connection.close(force);

      this.isConnected = false;
      logger.info("MongoDB connection closed successfully");
      console.log(chalk.green("✓ [MongoDB] Disconnected successfully"));

    } catch (error) {
      logger.error("Error during MongoDB disconnect:", {
        error: error.message,
        stack: error.stack,
      });
      console.error(chalk.red("✗ [MongoDB] Error during disconnect:", error.message));
      throw error;
    }
  }

  async ping() {
    try {
      if (!this.isConnected) {
        return false;
      }

      await mongoose.connection.db.admin().ping();
      return true;
    } catch (error) {
      logger.error("MongoDB ping failed:", error);
      return false;
    }
  }

  getConnectionInfo() {
    const connection = mongoose.connection;
    return {
      isConnected: this.isConnected,
      readyState: connection.readyState,
      readyStateDescription: this.getReadyStateDescription(connection.readyState),
      host: connection.host,
      port: connection.port,
      name: connection.name,
      collections: Object.keys(connection.collections),
      connectionAttempts: this.connectionAttempts,
      maxRetries: this.maxRetries,
      mongooseVersion: mongoose.version,
    };
  }

  getReadyStateDescription(state) {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    return states[state] || "unknown";
  }

  getStats() {
    if (!this.isConnected) {
      return null;
    }

    return {
      connections: mongoose.connections.length,
      models: Object.keys(mongoose.models),
      readyState: mongoose.connection.readyState,
      readyStateDescription: this.getReadyStateDescription(mongoose.connection.readyState),
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      mongooseVersion: mongoose.version,
    };
  }

  // Health check method
  async healthCheck() {
    const isHealthy = await this.ping();
    const connectionInfo = this.getConnectionInfo();

    return {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      connection: connectionInfo,
      stats: this.getStats(),
    };
  }
}

// Create and export a singleton instance
const mongoConnectionManager = new MongoDBConnectionManager();
export default mongoConnectionManager;

// Also export the class for testing purposes
export { MongoDBConnectionManager };
