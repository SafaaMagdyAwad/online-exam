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
/**
 * @swagger
 * /api/exam:
 *   get:
 *     summary: Get teacher exams with pagination
 *     description: Returns paginated exams created by the authenticated teacher
 *     tags:
 *       - Exams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of exams per page
 *     responses:
 *       200:
 *         description: Exams fetched successfully
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
 *                       example: 23
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", getMyExams);

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
