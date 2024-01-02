import CourseModal from "../Modals/CourseModal.js";
import UserModal from "../Modals/UserModal.js";
import jwt from "jsonwebtoken";
export const getLecturers = async (req, res) => {
  try {
    const list = await UserModal.find({ role: "Lecturer" });
    return res.status(200).json({ success: true, list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, image, level, description } = req.body.courseData;
    const result = await CourseModal.findOne({ name });
    if (!result) {
      const element = new CourseModal({
        name,
        image,
        level,
        description,
      });
      await element.save();
      return res.status(200).json({ success: true, message: "Course Added" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Course Already added" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addLectures = async (req, res) => {
  try {
    const { lecturerName, courseName, date, time } = req.body.lectureData;
    const ele = await CourseModal.findOne({ name: courseName });
    if (!ele) {
      return res
        .status(500)
        .json({ success: false, message: "Course does not exist" });
    }
    const check = await CourseModal.find({});
    function checkCondition() {
      let flag = false;
      for (let i = 0; i < check.length; i++) {
        check[i].lectures.forEach((k) => {
          if (k.lecturerName === lecturerName && k.date === date) {
            flag = true;
          }
        });
        return flag;
      }
    }
    if (checkCondition()) {
      return res
        .status(500)
        .json({ success: false, message: "Lecture already assigned" });
    }
    await CourseModal.findOneAndUpdate(
      { name: courseName },
      { $push: { lectures: { lecturerName, date, time,courseName } } },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Lecture scheduled" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const assignedLectures = async (req, res) => {
    try {
        const {token}=req.body;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
          return res
            .status(404)
            .json({ success: false, message: "Token not valid" });
        }
        const userId = decodedData?.userId;
        const myName=await UserModal.findOne({_id:userId})
        const check = await CourseModal.find({});
        function getResults() {
            let list=[]
            for (let i = 0; i < check.length; i++) {
              check[i].lectures.forEach((k) => {
                if (k.lecturerName ===myName.name ) {
                 list.push(k)
                }
              });
            }
            return list;
          }
          return res.status(200).json({ success: true, lectureList:getResults() });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };