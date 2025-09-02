import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbsql.js';
import userRoutes from './route/users.js';   // 👈 import router once

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👇 mount all user routes here
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Transport Management Platform API');
});
