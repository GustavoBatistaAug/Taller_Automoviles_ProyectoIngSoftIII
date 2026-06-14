import express from 'express';
import userRoutes from './routes/userRoute.routes.js';

const app = express();
app.use(express.json());
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send("Homepage - Garage Solutions");
})

export default app;