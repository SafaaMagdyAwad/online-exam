import Teacher from "../models/TeacherModel.js";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "crypto";
import sendEmail from "../utils/sendEmail.mjs";

/**
 * Generate JWT Token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
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
    const { name, email, password, jopTitle,role } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password || !jopTitle) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
// if (!role){role="teacher"}
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // 2️⃣ Check if email exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // 3️⃣ Create teacher (password hashed via pre-save hook)
    const teacher = await Teacher.create({
      name,
      email,
      password,
      jopTitle,
      role,
    });

    // 4️⃣ Response
    res.status(201).json({
      message: "Teacher registered successfully",
      token: generateToken(teacher._id, teacher.role),
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        jopTitle: teacher.jopTitle,
        paid: teacher.paid,
        role: teacher.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

    if (!teacher) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 3️⃣ Compare password
    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Success
    res.status(200).json({
      message: "Login successful",
      token: generateToken(teacher._id, teacher.role),
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        paid: teacher.paid,
        role: teacher.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.json({
        message: "Email is not connected to any account"
      });
    }

    const resetToken = randomBytes(32).toString("hex");

    teacher.resetPasswordToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    teacher.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await teacher.save();

    const resetUrl = `${process.env.FRONT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: teacher.email,
      subject: "اعد ضبط كلمة المرور",
      html: `
        <h2>اعاده ضبط كلمة المرور</h2>
        <p>اضغط على الرابط الموجود بالاسفل لاعاده تعيين كلمه المرور:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>سيتم تعطيل الرابط خلال 10 دقائق.</p>
      `
    });

    res.json({
      message: "If this email exists, a reset link has been sent",
     
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const teacher = await Teacher.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!teacher) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // password will be hashed by pre-save hook
    teacher.password = password;
    teacher.resetPasswordToken = undefined;
    teacher.resetPasswordExpire = undefined;

    await teacher.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const googleLogin = async (req, res) => {
    try {
        const { email, name, googleId } = req.body;
        // البحث عن المستخدم أو إنشاء واحد جديد إذا لم يكن موجود
        const user = await Teacher.findOneAndUpdate(
            { $or: [{ googleId: googleId }, { email: email }] },
            { 
                $set: { 
                    name: name,
                    email: email,
                    googleId: googleId,
                    lastLogin: new Date()
                } 
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            success: true,
            data: user  // تم تعديل result إلى user
        });
    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "حدث خطأ في السيرفر"
        });
    }
};
