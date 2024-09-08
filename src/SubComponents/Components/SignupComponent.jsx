import React from "react";
import "../SCSS/SignupComponent.scss"; // Import the SCSS file
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
function SignupComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loginError, SetLoginError] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !signUpData.email.includes("@") ||
      signUpData.password.length < 1 ||
      signUpData.name.length < 1
    ) {
      SetLoginError("Enter Valid Credentials");
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://taiyari-backend.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.error) SetLoginError(res.error);
      else {
        setSignUpData({
          email: "",
          password: "",
          name: "",
        });
        alert("User created successfully! Please Login");
        window.location.reload();
      }
    } catch (err) {
      setLoginError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Signup</h2>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Name
          </label>
          <input
            className="login-input"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your email"
            value={signUpData.name}
            onChange={
              (e) => setSignUpData({ ...signUpData, name: e.target.value }) //
            }
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            className="login-input"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={signUpData.email}
            onChange={
              (e) => setSignUpData({ ...signUpData, email: e.target.value }) //
            }
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={signUpData.password}
            onChange={
              (e) => setSignUpData({ ...signUpData, password: e.target.value }) //
            }
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
          onClick={(e) => registerUser(e)}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {loginError.length > 1 && (
          <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
        )}
      </form>
    </div>
  );
}

export default SignupComponent;
