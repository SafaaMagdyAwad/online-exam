import express from "express";
import {
  updateTeacherPaidStatus
} from "../controllers/AdminController.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";
// import { protect } from "../middleware/authMiddleware.mjs";
// import { adminMiddleware } from "../middleware/adminMiddleware.mjs";

const router = express.Router();


router.patch("/teacher/:id/paid",authAdmin, updateTeacherPaidStatus);


export default router;
