import express from "express";
import {
  createExam,
  generateExamCode,
  getMyExams,
  getExamById,
  updateExamById,
  updateExamVById,
  deleteExam
} from "../controllers/ExamController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Exam
 *   description: Exam management
 */

//get exam by id
/**
 * @swagger
 * /api/exam/{id}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Exam details
 */


router.get("/:examId", getExamById);

router.use(authTeacher);

// Create exam


/**
 * @swagger
 * /api/exam:
 *   post:
 *     summary: Create exam
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *               totalMarks:
 *                 type: number
 *     responses:
 *       201:
 *         description: Exam created
 */

router.post("/", createExam);

// Get teacher exams
router.get("/", getMyExams);

//update exam by id
router.put("/:examId", updateExamById);

//update exam visibility
/**
 * @swagger
 * /api/exam/{id}/active:
 *   get:
 *     summary: Toggle exam availability
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Exam status toggled
 */

router.get("/:examId/active", updateExamVById);
// Generate access code
/**
 * @swagger
 * /api/exam/{id}/code:
 *   post:
 *     summary: Generate exam code
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Code generated
 */

router.post("/:examId/code", generateExamCode);

//delete exam
/**
 * @swagger
 * /api/exam/{id}:
 *   delete:
 *     summary: Delete exam
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exam deleted
 */

router.delete("/:examId", deleteExam);
export default router;
