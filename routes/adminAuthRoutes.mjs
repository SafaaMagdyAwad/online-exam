import express from "express";
import { adminLogin } from "../controllers/AdminAuthComtroller.mjs";

const router = express.Router();

router.post("/login", adminLogin);

export default router;
