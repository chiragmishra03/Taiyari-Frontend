import React from "react";
import "../SCSS/PopupComponent.scss"; // Import SCSS for styling the popup

function PopupComponent({ closePopup, selectDifficulty }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1>Select Difficulty</h1>
        <div className="difficulty-buttons">
          <button
            onClick={() => selectDifficulty("Easy")}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            Easy
          </button>
          <button
            onClick={() => selectDifficulty("Medium")}
            style={{
              backgroundColor: "yellow",
              color: "black",
              border: "none",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            Medium
          </button>
          <button
            onClick={() => selectDifficulty("Hard")}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            Hard
          </button>
          <button
            onClick={() => selectDifficulty("Mixed")}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            Mixed
          </button>
        </div>
        <button className="close-btn" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupComponent;
