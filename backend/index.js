import express, { response } from "express";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config.js";
import { Book } from "./models/bookModel.js";
import cors from "cors";
import helmet from "helmet";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware
app.use(cors()); // For frontEnd Communication
app.use(express.json()); //Parse JSON Requests
app.use(helmet()); //Basic security middleware

//Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully ^_^");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); //Exits Proccess if a failure occurs
  }
};

//Routes

app.use("/books", booksRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome To MERN STACK BOOK STORE!");
});

//Error Handling MiddleWare
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Start the server and connect to DB
const startServer = async () => {
  await connectToDatabase(); //Ensure DB is connected before starting the server
};

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

startServer();
