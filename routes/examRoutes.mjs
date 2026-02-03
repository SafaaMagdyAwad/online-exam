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
 *   name: Exams
 *   description: Teacher exams management
 */

/**
 * @swagger
 * /api/exam/{examId}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exam:
 *                   $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */

router.get("/:examId", getExamById);

// Require authentication for all routes below
router.use(authTeacher);

/**
 * @swagger
 * /api/exam:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamInput'
 *           example:
 *             title: "electros ch2"
 *             duration: 60
 *             totalMarks: 100
 *             instructions: "جاوب صح"
 *     responses:
 *       201:
 *         description: Exam created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 exam:
 *                   $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Server error
 */

router.post("/", createExam);

/**
 * @swagger
 * /api/exam:
 *   get:
 *     summary: Get all exams for the logged-in teacher
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of exams per page
 *     responses:
 *       200:
 *         description: List of exams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exams:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exam'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Server error
 */
router.get("/", getMyExams);

/**
 * @swagger
 * /api/exam/{examId}:
 *   put:
 *     summary: Update an exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: Exam ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamInput'
 *           example:
 *             title: "electros ch1"
 *             duration: 30
 *             totalMarks: 110
 *             instructions: "جاوب صح"
 *     responses:
 *       200:
 *         description: Exam updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 exam:
 *                   $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.put("/:examId", updateExamById);

/**
 * @swagger
 * /api/exam/{examId}/active:
 *   get:
 *     summary: Toggle exam active status
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam active status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 exam:
 *                   $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.get("/:examId/active", updateExamVById);

/**
 * @swagger
 * /api/exam/{examId}/code:
 *   post:
 *     summary: Generate an access code for an exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: Exam ID
 *     responses:
 *       201:
 *         description: Access code generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post("/:examId/code", generateExamCode);

/**
 * @swagger
 * /api/exam/{examId}:
 *   delete:
 *     summary: Delete an exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 exam:
 *                   $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */


router.delete("/:examId", deleteExam);


export default router;
