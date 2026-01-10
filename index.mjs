import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
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
//import yhe port from .env file
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: "*", // or your frontend URL
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.get("/", (req, res) => res.json({ message: "API is running..." }));

//teacher authentication routes
app.use('/api/auth', authRoutes);
//admin authentication routes
app.use('/api/auth/admin', adminAuthRoutes);
//admin routes
app.use('/api/admin', adminRoutes);
//exam routes
 app.use('/api/exam', examRoutes);
 //question routes
app.use('/api/questions', questionRoutes);
//connect to the database
app.use('/api/teacher/reports', reportRoutes);
//student routes
app.use('/api/student', studentRoutes);

//filter students
app.use('/api/teacher', studentAttemptRouter);
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB connection error ❌', err));


//make the app listen on the port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});