import Teacher from "../models/TeacherModel.js";
import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * @desc    Register new teacher
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(name,"from controller");
    
    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // 2️⃣ Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // 3️⃣ Create teacher
    const teacher = await Teacher.create({
      name,
      email,
      password
    });

    // 4️⃣ Response
    res.status(201).json({
      message: "Teacher registered successfully",
      token: generateToken(teacher._id),
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        paid: teacher.paid
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/**
 * @desc    Login teacher
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Find teacher + password
    const teacher = await Teacher
      .findOne({ email })
      .select("+password");
    console.log(teacher,"from login controller");
    if (!teacher) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 3️⃣ Compare password
    const isMatch = await teacher.comparePassword(password);
    console.log(isMatch,"is match");
    console.log(teacher.paid,"teacher paid");
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Success response
    res.status(200).json({
      message: "Login successful",
      token: generateToken(teacher._id),
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        paid: teacher.paid
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

