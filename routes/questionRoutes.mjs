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
 *   description: Exam questions
 */

/**
 * @swagger
 * /api/questions/{examId}:
 *   post:
 *     summary: Add question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: number
 *     responses:
 *       201:
 *         description: Question added
 */

router.post(
  "/:examId",
  addQuestion
);

/**
 * @swagger
 * /api/questions/{examId}:
 *   get:
 *     summary: Get questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 */

router.get(
  "/:examId",
  getQuestions
);
/**
 * @swagger
 * /api/questions/{examId}/{questionId}:
 *   put:
 *     summary: Update question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 */

router.put(
  "/:examId/:questionId",
  updateQuestion
);
/**
 * @swagger
 * /api/questions/{examId}/{questionId}:
 *   delete:
 *     summary: Delete question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 */

router.delete(
  "/:examId/:questionId",
  deleteQuestion
);

export default router;
