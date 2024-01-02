import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Login, Register, getCurrentUser } from "./Controllers/UserControllers.js";
import { addLectures, assignedLectures, createCourse, getLecturers } from "./Controllers/CourseControllers.js";
import { CheckAdmin} from "./Middlewares/AllMiddlewares.js";



const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.get("/", (req, res) => {
  res.send("App Working");
});
app.post("/register",Register)
app.post("/login",Login)
app.post("/current-user",getCurrentUser)
app.post("/get-lecturers",CheckAdmin,getLecturers)
app.post("/add-course",CheckAdmin,createCourse)
app.post("/add-lecture",CheckAdmin,addLectures)
app.post("/get-lectures",assignedLectures)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});
app.listen(8000, () => {
  console.log("Server running on port 8000");
});