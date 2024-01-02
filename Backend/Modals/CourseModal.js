import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Basic","Advance"],
    default: "Basic",
  },
  lectures:[Object]
});

export default mongoose.model("Course", courseSchema);