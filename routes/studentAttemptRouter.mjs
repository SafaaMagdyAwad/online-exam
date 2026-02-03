import express from "express";
import { getFilteredResults } from "../controllers/StudentAttemptController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";
import { addStudentsWithCodes, updateTeacher ,getTeacher } from "../controllers/TeacherController.mjs";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher profile management and student attempts
 */

/**
 * @swagger
 * /api/teacher/{teacherId}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the teacher
 *     responses:
 *       200:
 *         description: Teacher information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 jobTitle:
 *                   type: string
 *               example:
 *                 _id: "64f7c7f9b8d5c2a1f0a12345"
 *                 name: "Ahmed Ali"
 *                 email: "ahmed@example.com"
 *                 phone: "0123456789"
 *                 jobTitle: "Math Teacher"
 */

/**
 * @swagger
 * /api/teacher/{teacherId}:
 *   put:
 *     summary: Update teacher information
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     requestBody:
 *       description: Fields to update (at least one)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               password:
 *                 type: string
 *               repassword:
 *                 type: string
 *             example:
 *               name: "Ahmed Ali"
 *               email: "ahmed@example.com"
 *               password: "newpassword123"
 *               repassword: "newpassword123"
 *     responses:
 *       200:
 *         description: Updated teacher information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 jobTitle:
 *                   type: string
 *               example:
 *                 _id: "64f7c7f9b8d5c2a1f0a12345"
 *                 name: "Ahmed Ali"
 *                 email: "ahmed@example.com"
 *                 phone: "0123456789"
 *                 jobTitle: "Math Teacher"
 */

/**
 * @swagger
 * /api/teacher/attempts:
 *   get:
 *     summary: Filter student attempts
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: studentName
 *         schema:
 *           type: string
 *         description: Filter by student name
 *       - in: query
 *         name: examId
 *         schema:
 *           type: string
 *         description: Filter by exam ID
 *       - in: query
 *         name: minScore
 *         schema:
 *           type: number
 *         description: Minimum score
 *       - in: query
 *         name: maxScore
 *         schema:
 *           type: number
 *         description: Maximum score
 *     responses:
 *       200:
 *         description: Filtered student attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentName:
 *                     type: string
 *                   score:
 *                     type: number
 *                   startedAt:
 *                     type: string
 *                     format: date-time
 *                   finishedAt:
 *                     type: string
 *                     format: date-time
 *                   examId:
 *                     type: string
 *                   status:
 *                     type: string
 *               example:
 *                 - studentName: "Sara Mohamed"
 *                   score: 85
 *                   startedAt: "2026-02-03T10:00:00.000Z"
 *                   finishedAt: "2026-02-03T10:30:00.000Z"
 *                   examId: "64f7d7f9b8d5c2a1f0a67890"
 *                   status: "completed"
 */

/**
 * @swagger
 * /api/teacher/exam/add-students:
 *   post:
 *     summary: Add students with unique access codes to an exam
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examId:
 *                 type: string
 *                 description: ID of the exam
 *               studentNames:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of student names
 *             example:
 *               examId: "64f7d7f9b8d5c2a1f0a67890"
 *               studentNames: ["Ahmed", "Sara", "Mona"]
 *     responses:
 *       200:
 *         description: List of students with generated access codes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   studentCode:
 *                     type: string
 *               example:
 *                 - name: "Ahmed"
 *                   studentCode: "1a2b3c"
 *                 - name: "Sara"
 *                   studentCode: "4d5e6f"
 */


router.get("/:teacherId",getTeacher)

router.put("/:teacherId",authTeacher, updateTeacher)

router.get("/attempts", authTeacher, getFilteredResults);
//[not used in this version]
router.post("/exam/add-students", authTeacher, addStudentsWithCodes);

export default router;
