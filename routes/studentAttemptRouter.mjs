import express from "express";
import { getFilteredResults } from "../controllers/StudentAttemptController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";
import { addStudentsWithCodes, updateTeacher ,getTeacher } from "../controllers/TeacherController.mjs";

const router = express.Router();
//get teacher with Id
/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher profile
 */

/**
 * @swagger
 * /api/teacher/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 */

router.get("/:teacherId",getTeacher)
//updte teacher data
/**
 * @swagger
 * /api/teacher/{id}:
 *   put:
 *     summary: Update teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 */

router.put("/:teacherId",authTeacher, updateTeacher)
// عرض نتائج الطلاب مع الفلاتر
/**
 * @swagger
 * /api/teacher/attempts:
 *   get:
 *     summary: Filter student attempts
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: studentName
 *         schema:
 *           type: string
 */

router.get("/attempts", authTeacher, getFilteredResults);
//[not used in this version]
router.post("/exam/add-students", authTeacher, addStudentsWithCodes);

export default router;
