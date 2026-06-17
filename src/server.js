import app from './app.js';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js'

dotenv.config();

const PORT = process.env.PORT || 3000;

await testConnection();

app.listen(PORT, () => {
    console.log('Servidor ejecutando en http://localhost:' + PORT);
});