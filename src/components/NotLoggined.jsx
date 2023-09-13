
import React, { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
export const NonLoggedInRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };
  export const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };