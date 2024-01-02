import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema({
  lecturerName: {
    type: String,
    required: true,
  },
  courseName:{
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true,
  },
  
});

export default mongoose.model("Lecture", lectureSchema);