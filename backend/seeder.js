import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Profile from "./models/Profile.js";
import users from "./data/users.js";
import profiles from "./data/profiles.js";
import connectDB from "./config/db.js"; // Ensure this connects to MongoDB

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Profile.deleteMany();

    // Insert users and get inserted users' data
    const createdUsers = await User.insertMany(users);

    // Assign user `_id` to profiles
    const seededProfiles = profiles.map((profile, index) => ({
      ...profile,
      user: createdUsers[index]._id // Map corresponding user
    }));

    // Insert profiles
    await Profile.insertMany(seededProfiles);

    console.log("Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

// Run seeding function
seedData();
// Run this file using the following command:
// node backend/seeder.js
