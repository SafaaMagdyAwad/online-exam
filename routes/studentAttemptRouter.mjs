import express from "express";
import { getFilteredResults } from "../controllers/StudentAttemptController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";
import { addStudentsWithCodes, updateTeacher ,getTeacher } from "../controllers/TeacherController.mjs";

const router = express.Router();
//get teacher with Id
router.get("/:teacherId",getTeacher)
//updte teacher data
router.put("/:teacherId",authTeacher, updateTeacher)
// عرض نتائج الطلاب مع الفلاتر
router.get("/attempts", authTeacher, getFilteredResults);

router.post("/exam/add-students", authTeacher, addStudentsWithCodes);

export default router;
