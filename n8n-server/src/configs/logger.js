import winston from "winston";

import { CONSTANTS } from "./constants.js";
import chalk from "chalk";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: CONSTANTS.LOG_LEVEL,
  format: logFormat,
  defaultMeta: { service: "api" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 52428800, // 50MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 52428800, // 50MB
      maxFiles: 5,
    }),
  ],
});

// Add console transport for non-production environments
if (CONSTANTS.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

export const logError = (err) => {
  // Handle both Error objects and strings
  const isErrorObject = err instanceof Error;
  const errorName = isErrorObject ? err.name : 'Error';
  const errorMessage = isErrorObject ? err.message : err;
  const errorStack = isErrorObject ? err.stack : null;

  // Format the timestamp with readable format (e.g., YYYY-MM-DD HH:mm:ss)
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  // Use Chalk for coloring the output
  const simpleErrorMessage = chalk.redBright(`${errorName}: ${errorMessage}`);
  const timestampMessage = chalk.yellow(`[${timestamp}]`);

  // Extract all project-related file paths from the stack trace if available
  let projectFiles = [];
  if (errorStack) {
    projectFiles = errorStack
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("at"))
      .filter((line) => !line.includes("node_modules"))
      .map((line) => {
        const match = line.match(/\((.*)\)/); // Extract file path inside parentheses
        return match ? match[1] : line.split("at ")[1];
      })
      .filter((path) => path);
  }

  // Log the formatted error message using winston logger
  logger.error(`${timestampMessage} ${simpleErrorMessage}`);

  // Log each relevant project file path with color
  projectFiles.forEach((file) => {
    logger.error(chalk.bold(`  at ${file}`));
  });
};
