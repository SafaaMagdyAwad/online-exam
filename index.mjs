import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

// routes
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
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/teacher', studentAttemptRouter);
app.use('/api/teacher/reports', reportRoutes);
app.use('/api/student', studentRoutes);

// MongoDB connection (reuse)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected ✅");
}

connectDB();

// ❌ DO NOT use app.listen()
// ✅ Export serverless handler
export default serverless(app);
