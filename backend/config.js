import dotenv from "dotenv";

dotenv.config(); // Load enviroment variables

export const PORT = 5555;
export const MONGO_URI = process.env.MONGO_URI;
