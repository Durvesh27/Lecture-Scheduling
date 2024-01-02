import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import api from "../Api Config";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Lecturer",
  });
  const router = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((userData.name && userData.email, userData.password && userData.role)) {
      try {
        const response = await api.post("/register", {
          userData,
        });
        if (response.data.success) {
          alert(response.data.message);
          router("/login");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className="user">
      <h2 className="user-Text">Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="form-ip"
        />
        <label>Enter your email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="form-ip"
        />
        <label>Select role</label>
        <select name="role" onChange={handleChange} className="form-ip opt">
          <option>Lecturer</option>
          <option>Admin</option>
        </select>
        <label>Enter your password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="form-ip"
        />
        <input type="submit" value="Register" className="reg-btn" />
        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <b style={{ color: "blue" }} onClick={() => router("/login")}>
            Login
          </b>
        </p>
      </form>
    </div>
  );
};

export default Register;