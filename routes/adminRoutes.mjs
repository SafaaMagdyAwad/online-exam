import express from "express";
import {
  updateTeacherPaidStatus
} from "../controllers/AdminController.mjs";
// import { protect } from "../middleware/authMiddleware.mjs";
// import { adminMiddleware } from "../middleware/adminMiddleware.mjs";

const router = express.Router();

// router.post("/register", registerTeacher);
// router.patch("/teacher/:id/paid", protect, adminMiddleware, updateTeacherPaidStatus);
router.patch("/teacher/:id/paid", updateTeacherPaidStatus);


export default router;
