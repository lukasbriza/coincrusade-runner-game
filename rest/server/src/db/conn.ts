import mongoose from "mongoose";
import { gameDataSchema } from "./schemas";

export const getConnection = async () => {
    try {
        const connectionString = process.env.MONGODB_URI

        const conn = await mongoose.createConnection(connectionString ?? "", {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        }).asPromise()

        conn.set('debug', true);
        conn.model("GameData", gameDataSchema, "game-data")

        return conn
    } catch (error) {
        console.log(error)
    }

}

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on("SIGINT", () => {
    mongoose.connection
        .close()
        .then(() => {
            console.log("Mongoose connection disconnected due to application termination.")
        })
})