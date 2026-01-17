
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Teacher from "../models/TeacherModel.js";

// dotenv.config();

// const deleteAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     const result = await Teacher.deleteOne({ email: "adminsafaa@gmail.com" });

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


import mongoose from "mongoose";
import dotenv from "dotenv";
import Teacher from "../models/TeacherModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Teacher.findOne({ email: "adminsafaa@gmail.com" });
    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }


    await Teacher.create({
      name:"Safaa Admin",
      email: "adminsafaa@gmail.com",
      password: "SafaaMagdy@123",
      role:"admin",
      jopTitle:"admin"
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();