import React, { useContext } from "react";
import "./Admin.css";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import api from "../Api Config";
const AddCourseBox = ({close}) => {
  const [courseData, setCourseData] = useState({
    name: "",
    image: "",
    level: "Basic",
    description: "",
  });
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };
  console.log(courseData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        courseData.name&&
        courseData.image &&
        courseData.level &&
        courseData.description
    ) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        if (token) {
          const response = await api.post(
            "/add-course",
            { courseData, token }
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
        console.log(error);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="admin">
      <div className="admin-box">
        <form className="form-admin" onSubmit={handleSubmit}>
          <label>Enter Course Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Add Course Image URL</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Select Course level</label>
        <select name="level" onChange={handleChange} className="form-ip">
          <option>Basic</option>
          <option>Advance</option>
        </select>
          <label>Enter Course description</label>
          <Textarea
            name="description"
            onChange={handleChange}
            className="form-ip"
            size='sm'
          />

          <input type="submit" value="Create" className="reg-btn" />
        </form>
      </div>
    </div>
  );
};

export default AddCourseBox;