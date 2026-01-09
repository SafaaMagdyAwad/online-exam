import { adminLoginService } from "../services/AdminAuthService.mjs";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const data = await adminLoginService(email, password);

    res.json({
      message: "Admin logged in successfully",
      ...data
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};
