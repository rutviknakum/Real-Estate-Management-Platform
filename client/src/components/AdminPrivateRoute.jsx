import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  // Replace this with your actual admin authentication logic
  const isAdminAuthenticated = !!localStorage.getItem("admin_token");

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminPrivateRoute;
