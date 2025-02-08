import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Admin Sidebar */}
      <div className="w-72 fixed top-0 left-0 bottom-0 bg-gray-800 text-white">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
