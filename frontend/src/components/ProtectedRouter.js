import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../slice/authSlice";

export const ProtectedRouter = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};