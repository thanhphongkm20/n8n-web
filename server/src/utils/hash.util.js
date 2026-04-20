import crypto from "crypto";

/**
 * Generate a random salt
 * @param {number} length - The number of bytes for the salt. Default is 32.
 * @param {string} encoding - The encoding for the salt. Default is 'base64'.
 * @returns {string} - The generated salt as a string.
 */
export const generateRandomSalt = (length = 32, encoding = "base64") => {
  const randomBytes = crypto.randomBytes(length);
  const salt = randomBytes.toString(encoding);
  return salt;
};

/**
 * Hashes a password using PBKDF2 with the given salt.
 *
 * @param {string} password - The plaintext password to hash.
 * @param {string} salt - The salt to use for hashing.
 * @returns {Promise<string>} - The hashed password in base64 format.
 */
export const hashPassword = (password, salt) => {
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    "sha512",
  ).toString("base64");

  return hashedPassword;
};

/**
 * Verifies if a plaintext password matches the hashed password.
 *
 * @param {string} password - The plaintext password to verify.
 * @param {string} hashedPassword - The previously hashed password.
 * @param {string} salt - The salt used to hash the original password.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
export const verifyPassword = async (password, passwordHashed, salt) => passwordHashed === await hashPassword(password, salt);
