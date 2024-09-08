import React, { useContext, useEffect, useState } from "react";
import LanguageCard from "../SubComponents/Components/LanguageCard";
import techData from "../Data";
import "./SCSS/HomePage.scss";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";
function Homepage() {
  const [languages, setLanguages] = useState(techData);
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    searchData();
  }, [query, selectedOption]);
  function searchData() {
    let filteredLanguages = techData;
    if (query.length > 0) {
      filteredLanguages = filteredLanguages.filter((data) =>
        data.techName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedOption !== "all") {
      filteredLanguages = filteredLanguages.filter(
        (data) => data.tag === selectedOption
      );
    }
    setLanguages(filteredLanguages);
  }

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    window.location.href = "/";
  };
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "0" }}>
        <h1>
          Welcome{" "}
          {user && user.name
            ? user.name.charAt(0).toUpperCase() + user.name.substring(1)
            : " User"}
        </h1>
        {user ? (
          <p>
            You have taken: <b>{user.quizes} Quizzes</b>{" "}
          </p>
        ) : (
          <p>
            Please{" "}
            <button
              className="login-button"
              style={{ padding: "4px 10px", margin: "0px 4px" }}
              onClick={handleLogin}
            >
              Login
            </button>{" "}
            to check your quizzes.
          </p>
        )}
        {user && (
          <button
            style={{
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#fff",
              border: "none",
              padding: "4px 10px",
              margin: "0px 4px",
              backgroundColor: "red",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <p>Start Practicing in these available languages</p>
        <div className="search-filter-grp">
          <input
            type="text"
            placeholder="Search Here"
            className="login-input"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <select
            value={selectedOption}
            id="lang"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="web">Web Dev</option>
            <option value="core">Core Languages</option>
          </select>
        </div>
      </div>
      <div className="technology-cards-container">
        {languages.map((data) => (
          <LanguageCard key={data.id} techData={data} />
        ))}
      </div>
    </>
  );
}

export default Homepage;
