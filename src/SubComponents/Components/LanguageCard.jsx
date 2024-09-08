import React, { useContext, useState } from "react";
import PopupComponent from "../Components/PopupComponent";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "../SCSS/LanguageCard.scss";
function LanguageCard({ techData }) {
  const { user, setUser } = useContext(UserContext);
  const { techName, imageSrc } = techData;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  function PrepOn() {
    setIsPopupOpen(true);
  }
  const addQuiz = async () => {
    try {
      const response = await fetch(
        "https://taiyari-backend.onrender.com/api/auth/add-quiz",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ id: user._id }), // Ensure `user._id` is valid
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      setUser(res.userfield);
      localStorage.setItem("userinfo", JSON.stringify(res.userfield));
    } catch (error) {
      console.error("Error adding quiz:", error); // Handle errors
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const selectDifficulty = (level) => {
    setDifficulty(level);
    addQuiz();
    navigate(`/practice/${techName}/${level}`);
    closePopup();
  };
  return (
    <>
      <div className="language-card">
        <img src={imageSrc} alt={techName} className="language-card-image" />
        <div className="language-card-bottom">
          <h2 className="language-card-title">{techName}</h2>
          <button
            className="login-button"
            onClick={() => {
              PrepOn(techName);
            }}
          >
            Start Prep
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <PopupComponent
          closePopup={closePopup}
          selectDifficulty={selectDifficulty}
        />
      )}
    </>
  );
}

export default LanguageCard;
