import express from 'express';
import mongoose from 'mongoose';
const app = express();
//import yhe port from .env file
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs';
dotenv.config();
app.use(express.json());
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
//connect to the database

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB connection error ❌', err));


//make the app listen on the port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});