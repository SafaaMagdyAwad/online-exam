import express from "express";
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions
} from "../controllers/QuestionController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Manage exam questions (teacher only)
 */

/**
 * @swagger
 * /api/questions/{examId}:
 *   post:
 *     summary: Add a new question to an exam
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *               - correctAnswer
 *             properties:
 *               question:
 *                 type: string
 *                 description: Text of the question
 *               questionImage:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Optional image URL
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of answer options (at least 2)
 *               correctAnswer:
 *                 type: integer
 *                 description: Index of the correct option (0-based)
 *           example:
 *             question: "ما هو الرقم التالي؟"
 *             questionImage: "https://example.com/question1.png"
 *             options: ["3","4","5","6"]
 *             correctAnswer: 2
 *     responses:
 *       201:
 *         description: Question added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Question added successfully
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Validation error or bad request
 */

/**
 * @swagger
 * /api/questions/{examId}:
 *   get:
 *     summary: Retrieve all questions for an exam
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exam
 *     responses:
 *       200:
 *         description: List of exam questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       400:
 *         description: Exam not found or unauthorized
 */

/**
 * @swagger
 * /api/questions/{examId}/{questionId}:
 *   put:
 *     summary: Update an existing question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               questionImage:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: integer
 *           example:
 *             question: "ما هو الرقم التالي؟"
 *             options: ["3","4","5","6"]
 *             correctAnswer: 1
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Question updated successfully
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Validation error or bad request
 */

/**
 * @swagger
 * /api/questions/{examId}/{questionId}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the question to delete
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Question deleted successfully
 *       400:
 *         description: Exam or question not found / unauthorized
 */

router.post("/:examId", addQuestion);
router.get("/:examId", getQuestions);
router.put("/:examId/:questionId", updateQuestion);
router.delete("/:examId/:questionId", deleteQuestion);

export default router;
