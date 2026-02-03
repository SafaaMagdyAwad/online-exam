import express from "express";
import {
  updateTeacherPaidStatus
} from "../controllers/AdminController.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";


const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /api/admin/teacher/{id}/paid:
 *   patch:
 *     summary: Update a teacher's paid status
 *     description: Allows an admin to update the paid status of a teacher.  
 *                  Validates the input and checks if the teacher exists.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paid
 *             properties:
 *               paid:
 *                 type: boolean
 *                 description: Paid status of the teacher
 *                 example: true
 *     responses:
 *       200:
 *         description: Paid status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teacher's paid status updated to true
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 63f1f2a1c5d4b1234567890a
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     paid:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid request (paid is not boolean)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paid status must be true or false
 *       404:
 *         description: Teacher not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teacher not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

router.patch("/teacher/:id/paid",authAdmin, updateTeacherPaidStatus);



export default router;
