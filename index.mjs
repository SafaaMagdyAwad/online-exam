import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import routes
import authRoutes from './routes/authRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs';
import examRoutes from './routes/examRoutes.mjs';
import questionRoutes from './routes/questionRoutes.mjs';
import reportRoutes from './routes/reportRoutes.mjs';
import studentRoutes from './routes/studentRoutes.mjs';
import adminAuthRoutes from './routes/adminAuthRoutes.mjs';
import studentAttemptRouter from './routes/studentAttemptRouter.mjs';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
})); // test route 
app.get("/", (req, res) => res.json({ message: "API is running..." }));
// routes 
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/teacher', studentAttemptRouter);
app.use('/api/teacher/reports', reportRoutes);
app.use('/api/student', studentRoutes);
// MongoDB connection 
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err));
// const port = process.env.PORT || 3000;
// app.listen(port, () => { console.log(`Server running on http://localhost:${port}`); });
export default app;
