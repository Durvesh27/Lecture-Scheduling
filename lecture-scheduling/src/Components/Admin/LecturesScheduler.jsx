import React from "react";
import "./Admin.css";
import { useState } from "react";
import api from "../Api Config";
const LecturesScheduler = ({close}) => {
  const [lectureData, setLectureData] = useState({
    lecturerName: "",
    courseName:"",
    date:"",
    time:""
  });
  const handleChange = (e) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };
console.log(lectureData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        lectureData.lecturerName&&
        lectureData.courseName&&
        lectureData.date&&
        lectureData.time 
    ) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        if (token) {
          const response = await api.post(
            "/add-lecture",
            { lectureData, token }
          );
          if (response.data.success) {
            alert(response.data.message);
            close()
          } else {
            alert(response.data.message);
          }
        } else {
          return alert("No token");
        }
      } catch (error) {
        alert(error.response?.data.message)
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="admin">
      <div className="admin-box">
        <form className="form-admin" onSubmit={handleSubmit}>
          <label>Enter Lecturer Name</label>
          <input
            type="text"
            name="lecturerName"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Course Name</label>
          <input
            type="text"
            name="courseName"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Select Date</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Time Duration</label>
          <input
            type="text"
            name="time"
            onChange={handleChange}
            className="form-ip"
          />
          <input type="submit" value="Create" className="reg-btn" />
        </form>
      </div>
    </div>
  );
};

export default LecturesScheduler;
