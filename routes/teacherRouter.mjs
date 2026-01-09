import express from "express";
import { addStudentsWithCodes } from "../controllers/teacherController.js";
import { protectTeacher } from "../middleware/authTeacher.js";

const router = express.Router();

// إضافة الطلاب + توليد كود

export default router;
