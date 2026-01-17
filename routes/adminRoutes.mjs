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
 *     summary: Update teacher paid status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paid:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Paid status updated
 */


router.patch("/teacher/:id/paid",authAdmin, updateTeacherPaidStatus);



export default router;
