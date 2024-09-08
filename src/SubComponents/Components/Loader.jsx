import React from "react";
import "../SCSS/Loader.scss";

function Loader() {
  return (
    <>
      Loading Next Ques! Please Wait
      <div className="loader">
        <div className="spinner"></div>
      </div>
    </>
  );
}

export default Loader;
