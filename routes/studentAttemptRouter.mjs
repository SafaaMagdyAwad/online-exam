import express from "express";
import { getFilteredResults } from "../controllers/StudentAttemptController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";
import { addStudentsWithCodes } from "../controllers/TeacherController.mjs";

const router = express.Router();

// عرض نتائج الطلاب مع الفلاتر
router.get("/attempts", authTeacher, getFilteredResults);

router.post("/exam/add-students", authTeacher, addStudentsWithCodes);

export default router;
