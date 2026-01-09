import express from "express";
import {
  updateTeacherPaidStatus
} from "../controllers/AdminController.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";


const router = express.Router();


router.patch("/teacher/:id/paid",authAdmin, updateTeacherPaidStatus);



export default router;
