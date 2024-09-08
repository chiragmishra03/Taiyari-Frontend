import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../SubComponents/Components/LoginComponent";
import "./SCSS/LoginPage.scss";
import loginImg from "../images/login-side-image.jpeg";
import SignupComponent from "../SubComponents/Components/SignupComponent";
import UserContext from "../context/UserContext";
function LoginPage() {
  const [whichForm, setwhichForm] = useState(true);
  const { user } = useContext(UserContext);
  const nav = useNavigate();
  const goHome = () => {
    nav("/home");
  };
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center", margin: "20px" }}>
        Taiyaari Karlo
      </h1>

      {!user ? (
        <div className="large-container-login">
          <div className="login-page-main-container">
            <div
              className="left-pane"
              style={{ backgroundImage: `url(${loginImg})` }}
            ></div>
            <div className="right-pane">
              <div className="login-content">
                {whichForm === true ? <LoginComponent /> : <SignupComponent />}

                <div className="buttons-grp">
                  <button
                    className="login-button"
                    onClick={() => setwhichForm(!whichForm)}
                  >
                    {whichForm === true ? "New User ?" : "Existing User ?"}
                  </button>
                  <button className="login-button" onClick={goHome}>
                    Explore without joining
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <h4 style={{ textAlign: "center" }}>You are Already Logged In</h4>
          <button className="login-button" onClick={goHome}>
            Back Home
          </button>
        </div>
      )}
    </>
  );
}

export default LoginPage;
