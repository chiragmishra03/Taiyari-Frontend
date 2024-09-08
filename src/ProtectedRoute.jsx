import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);
  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
