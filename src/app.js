import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', userRoutes);

app.use((err, req, res, next) => {
    console.error('Database/Server Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error'
    });
});

app.get('/', (req, res) => {
    res.send('Homepage - Garage Solutions');
});

export default app;