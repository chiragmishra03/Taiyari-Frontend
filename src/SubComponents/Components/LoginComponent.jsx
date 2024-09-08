import React, { useContext } from "react";
import { useState } from "react";
import "../SCSS/LoginComponent.scss"; // Import SCSS file
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

function LoginComponent() {
  const { setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, SetLoginError] = useState("");
  const navigate = useNavigate();
  async function handleInput(e) {
    e.preventDefault();
    if (!loginData.email.includes("@") || loginData.password.length < 1) {
      SetLoginError("Enter Valid Credentials");
      return;
    }
    const response = await fetch(
      "https://taiyari-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      }
    );
    const res = await response.json();
    if (res.error) {
      SetLoginError(res.error);
    } else {
      setUser(res.userfield);
      localStorage.setItem("userinfo", JSON.stringify(res.userfield));
      navigate("/home");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={
              (e) => setLoginData({ ...loginData, email: e.target.value }) //
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button
          onClick={(e) => handleInput(e)}
          type="submit"
          className="login-button"
        >
          Login
        </button>
        {loginError.length > 1 && (
          <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
        )}
      </form>
    </div>
  );
}

export default LoginComponent;
