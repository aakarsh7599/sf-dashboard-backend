import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { PrismaClient } from '@prisma/client';
import dashboardRoutes from './routes/dashboard';



// Load environment variables from .env
dotenv.config();

// Init Express and Prisma
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: 'https://sdb-frontend.onrender.com', // your frontend origin
  credentials: true
})); // Enable CORS
app.use(express.json()); // Parses JSON bodies

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});