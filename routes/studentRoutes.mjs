import express from "express";
import {
  enterExam,
  startExam,
  submitExam
} from "../controllers/StudentController.mjs";

const router = express.Router();

// enter exam by code
router.post("/enter", enterExam);

// start exam
router.post("/start", startExam);

// submit exam
router.post("/submit", submitExam);

export default router;
