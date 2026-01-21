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
import studentAttemptRouter from './routes/studentAttemptRouter.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";


dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",       // your dev frontend
  "https://online-exam-front.vercel.app" // production frontend
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // important for cookies/session
}));

// test route
app.get("/", (req, res) => res.json({ message: "API is running..." }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/teacher/reports', reportRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', studentAttemptRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
  })
);
// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB connection error ❌', err));

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// FIX: Use export default instead of module.exports
export default app;