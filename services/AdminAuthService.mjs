import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLoginService = async (email, password) => {
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    admin: {
      id: admin._id,
      email: admin.email
    }
  };
};
