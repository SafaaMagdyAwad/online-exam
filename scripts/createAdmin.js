import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/AdminModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Admin.findOne({ email: "admin@exam.com" });
    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("SafaaMagdy@123", 10);

    await Admin.create({
      email: "magdysafaa61@gmail.com",
      password: hashedPassword
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Admin from "../models/AdminModel.js";

// dotenv.config();

// const deleteAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     const result = await Admin.deleteOne({ email: "admin@exam.com" });

//     if (result.deletedCount === 0) {
//       console.log("⚠️ Admin not found");
//     } else {
//       console.log("✅ Admin deleted successfully");
//     }

//     process.exit();
//   } catch (error) {
//     console.error("❌ Error deleting admin:", error.message);
//     process.exit(1);
//   }
// };

// deleteAdmin();
