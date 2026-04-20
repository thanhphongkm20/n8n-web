import { logError } from "../configs/logger.js";
import { User } from "../models/user.model.js";
import userService from "../service/user.service.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.util.js";

const initAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await userService.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists, skipping initialization");
      return;
    }

    const randomSalt = generateRandomSalt();
    const hashedPass = await hashPassword("admin@example.com", randomSalt);

    // Default admin credentials
    const adminData = new User({
      email: "admin@example.com",
      salt: randomSalt,
      password: hashedPass,
      first_name: "System",
      last_name: "Administrator",
      display_name: "System Administrator",
      role: "admin",
    });

    // TODO: Create admin user in database
    const adminSaved = await userService.save(adminData);

    console.log(`Admin user initialized successfully: ${adminSaved.email}`);
  } catch (error) {
    logError(error);
  }
};

export default {
  initAdminUser,
};
