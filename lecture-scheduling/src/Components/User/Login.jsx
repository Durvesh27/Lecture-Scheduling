import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context";
import api from "../Api Config";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useNavigate();
  const { state } = useContext(AuthContext);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      try {
        const response = await api.post("/login", {
          userData,
        });
        if (response.data.success) {
          alert(response.data.message);
          localStorage.setItem(
            "Token",
            JSON.stringify(response.data.userObject.token)
          );
          login(response.data.userObject);
          if (response.data.userObject.role === "Admin") {
            router("/admin");
          } 
          else {
            router("/lecturer");
          }
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (state?.user?.name) {
      router("/");
    }
  }, [state]);

  return (
    <div className="user">
      <h2 className="user-Text">Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Enter your email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="form-ip"
        />
        <label>Enter your password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="form-ip"
        />
        <input type="submit" value="Login" className="reg-btn" />
        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <b style={{ color: "blue" }} onClick={() => router("/register")}>
            Register
          </b>
        </p>
      </form>
    </div>
  );
};

export default Login;