import app from "./app.js";
import "dotenv/config";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try{
        await connectDatabase();
        app.listen(PORT, () => {
        console.log("Servidor iniciado en http://localhost:3000/api/v1");
        });
    } catch(error){
        console.error("No fue posible conectar a MongoDB.");
        console.error(error);
        process.exit(1);
    }
}

startServer();