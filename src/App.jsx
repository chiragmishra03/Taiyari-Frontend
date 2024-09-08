import { useContext, useState } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import PracticePage from "./Pages/PracticePage";
import FooterComponent from "./SubComponents/Components/FooterComponent";
import UserContextProvider from "./context/UserContextProvider";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <UserContextProvider>
      <FooterComponent />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route
            path="/practice/:languageName/:level"
            element={<ProtectedRoute element={<PracticePage />} />}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
