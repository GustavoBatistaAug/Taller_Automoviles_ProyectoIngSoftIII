import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado correctamente.");
        console.log("Database:", mongoose.connection.name);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDatabase;